import { FaAngleDown, FaImages, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoClose, IoSend } from "react-icons/io5";
import ChatBoxItem from "./ChatBoxItem";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "../../redux/reducers/chatBoxReducer";
import { FormDataPost, UserModel } from "../../types/post";
import avatar_user from "../../assets/base/avatar_user.webp";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getMessage, sendMessage } from "../../services/ChatService";
import { ConversationModel, FileType, MessageModal } from "../../types/app";
import { RootState } from "../../redux/reducers";
import pusher from "../../services/pusher";
import audioMess from "../../assets/media/sound_mess.mp3";
import { Link } from "react-router-dom";
type chatBoxProps = {
  user_chat: UserModel;
};
const ChatBox = ({ user_chat }: chatBoxProps) => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const handleCloseChat = () => {
    dispatch(closeChat(user_chat.id));
  };
  const contentRef = useRef<HTMLDivElement>(null);
  // get message
  const [messages, setMessages] = useState<MessageModal[]>([]);
  const [scroll, setScroll] = useState("");
  const [convesation, setConversation] = useState<ConversationModel | null>(
    null
  );
  useEffect(() => {
    getMessage(user_chat.uuid).then((res) => {
      if (res && res.status) {
        setMessages(res.data.messages.reverse());
        setConversation(res.data.conversation);
        setScroll("scroll");
      }
    });
  }, [user_chat]);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [scroll]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // send message
  const [formData, setFormData] = useState<FormDataPost>({ content: "" });
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileType[]>([]);
  // sendMessage
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length <= 3 && filesArray.length + files.length <= 3) {
        Promise.all(
          filesArray.map((file) => {
            const type = file.type.split("/")[0];
            return new Promise<FileType>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target && e.target.result) {
                  resolve({ file: e.target.result + "", type: type });
                }
              };
              reader.readAsDataURL(file);
            });
          })
        ).then((images) => {
          setFiles((prev) => [...prev, ...images]);
        });
      }
    }
  };
  const handleRemoveFile = (i: number) => {
    setFiles(files.filter((_, index) => index != i));
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files : value,
    });
  };
  // handle submit create post

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.content = content;
    if (convesation && (formData.content || formData.medias)) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            data.append(key + "[]", value[i]);
          }
        } else {
          data.append(key, value as string);
        }
      });
      data.append("conversation_id", convesation.id + "");
      // send post data
      sendMessage(data).then((res) => {
        if (res && res.status) {
          setFormData({});
          setFiles([]);
          // setMessages((prev) => [...prev, res.data]);
          setContent("");
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight ;
          }
        }
      });
    }
  };
  // event message
  useEffect(() => {
    audioRef.current && audioRef?.current?.pause();
    if (convesation) {
      try {
        const channel = pusher.subscribe(`conversation.${convesation.id}`);
        const messageHandler = (data: {
          conversation: ConversationModel;
          message: MessageModal;
          user: UserModel;
        }) => {
          if (data) {
            setMessages((prev) => [
              ...prev,
              { ...data.message, user: data.user },
            ]);
            if (user.id != data.user.id) {
              audioRef.current && audioRef?.current?.play();
              if (contentRef.current) {
                contentRef.current.scrollTop = contentRef.current.scrollHeight;
              }
            }
          }
        };
        channel.bind("message", messageHandler);
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    }
  }, [convesation]);
  return (
    <div className="">
      <audio autoPlay hidden ref={audioRef}>
        <source src={audioMess} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex flex-col h-[450px] w-[330px] bg-dark-bg shadow-sm shadow-gray-700 rounded-lg">
        <div className="flex justify-between items-center border-b border-input">
          <div className="flex gap-2 items-center p-1 hover:bg-input rounded-lg cursor-pointer">
            <div className="w-[32px] h-[32px] rounded-full">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user_chat.avatar ?? avatar_user}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-0">
              <Link
                to={"/user/" + user_chat.uuid}
                className="font-bold text-text-1"
              >
                {user_chat.first_name + " " + user_chat.last_name}
              </Link>
              <div className="text-[13px] text-text">Đang hoạt động</div>
            </div>
            <div className="text-text mx-1">
              <FaAngleDown />
            </div>
          </div>
          <div className="flex items-center gap-1 p-1 text-primary-500 text-[16px]">
            <div className="rounded-full p-2 hover:bg-input cursor-pointer">
              <FaPhoneAlt />
            </div>
            <div className="rounded-full p-2 hover:bg-input cursor-pointer">
              <FaVideo />
            </div>
            <div
              onClick={handleCloseChat}
              className="rounded-full p-2 font-bold hover:bg-input cursor-pointer  "
            >
              <IoMdClose className="text-[22px] font-bold" />
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="flex-1 overflow-y-scroll scrollbar_custom scrollbar_hover flex flex-col gap-3 p-2"
        >
          {messages && messages.length > 0 ? (
            messages.map((message, index) => {
              return (
                <ChatBoxItem
                  type={user.id == message.user.id ? "right" : "left"}
                  key={index}
                  message={message}
                />
              );
            })
          ) : (
            <div className="text-sm text-center text-gray-500 py-5">
              Chưa có đoạn chat nào!
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-end justify-between p-2 gap-2"
        >
          <label
            htmlFor="images"
            className="text-[24px] hover:bg-input hover:text-primary-500 p-1 cursor-pointer rounded-full text-text pb-2"
          >
            <FaImages />
          </label>
          <input
            type="file"
            onChange={handleChangeInput}
            onInput={handleImage}
            multiple
            accept="image/*,video/*"
            name="medias"
            id="images"
            hidden
          />
          <div
            className={`flex-1 bg-input rounded-${
              files && files.length > 0 ? "lg" : "full"
            } py-2 px-3 flex flex-col gap-2`}
          >
            {files && files.length > 0 && (
              <div className="flex gap-3">
                {files.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[48px] h-[48px] py-2 rounded-lg bg-gray-700 relative"
                    >
                      <div
                        onClick={() => handleRemoveFile(index)}
                        className=" absolute top-[-8px] right-[-5px] bg-gray-800 shadow-sm hover:bg-gray-600 cursor-pointer rounded-full p-1"
                      >
                        <IoClose />
                      </div>
                      <img
                        className="w-full h-full object-cover "
                        src={item.file}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <input
              type="text"
              placeholder="Aa"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              name="content"
              className="w-full bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="text-[20px] hover:bg-input hover:text-primary-500 p-2 cursor-pointer rounded-full text-text pb-2"
          >
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;

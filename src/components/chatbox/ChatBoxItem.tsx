import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MessageModal } from "../../types/app";
import avatar_user from "../../assets/base/avatar_user.webp";
import { FormMartDateAgo } from "../functions/tool";
import { deleteMessage } from "../../services/ChatService";
import { useState } from "react";
type ChatBoxItemProps = {
  type: string;
  message: MessageModal;
};
const ChatBoxItem = ({ type = "left", message }: ChatBoxItemProps) => {
  const [isDelete, setIsdelete] = useState(false);
  const medias = message.media ? JSON.parse(message.media) : [];
  const handleDelete = () => {
    deleteMessage(message.id).then((res) => {
      if (res && res.status) {
        setIsdelete(true);
      }
    });
  };
  if (type === "left") {
    return (
      <div className="flex gap-2">
        <div className="flex items-end">
          <div className="w-[28px] h-[28px] rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={message.user.avatar ?? avatar_user}
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-1">
          {message.content && (
            <div className="flex-1 flex flex-col  gap- ">
              <div className="max-w-[200px] bg-input rounded-[20px] px-3 py-2 w-fit">
                {message.content}
              </div>
              <small className="text-center text-gray-500 text-[10px]">
                {FormMartDateAgo(message.created_at)}
              </small>
            </div>
          )}
          {medias.length > 0 && (
            <div>
              <div className="flex items-center gap-2">
                <div className="max-w-[200px]">
                  {medias.map((item: string, index: number) => {
                    return (
                      <img
                        key={index}
                        className="w-full h-full object-cover rounded-lg"
                        src={item}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 ">
        <div className="flex flex-col flex-1 gap-1">
          {isDelete ? (
            <div className="flex justify-end">
              <div className="text-right text-gray-500 bg-input w-fit p-2 rounded-full">
                Tin nhắn đã được thu hồi
              </div>
            </div>
          ) : (
            message.content && (
              <div className="flex-1 flex items-start gap-2 justify-end ">
                <Menu>
                  <MenuHandler>
                    <div className="p-2 hover:bg-input rounded-full cursor-pointer ">
                      <HiOutlineDotsHorizontal />
                    </div>
                  </MenuHandler>
                  <MenuList className="bg-dark-bg border-none shadow-sm shadow-gray-700 min-w-[84px] w-[26px] p-1">
                    {/* <MenuItem className="text-text-1 hover:bg-input hover:text-text-1 text-center p-2">
                    Trả lời
                  </MenuItem> */}
                    <MenuItem
                      onClick={handleDelete}
                      className="text-text-1 hover:bg-input hover:text-text-1 text-center p-2"
                    >
                      Xóa
                    </MenuItem>
                  </MenuList>
                </Menu>
                <div className="flex flex-col justify-end">
                  <div className="max-w-[200px] bg-primary-500 rounded-[20px] px-3 py-2">
                    {message.content}
                  </div>
                  <small className="text-right  text-gray-500 text-[10px]">
                    {FormMartDateAgo(message.created_at)}
                  </small>
                </div>
              </div>
            )
          )}

          {medias.length > 0 && (
            <div>
              <div className="flex items-center gap-2 justify-end">
                <Menu>
                  <MenuHandler>
                    <div className="p-2 hover:bg-input rounded-full cursor-pointer ">
                      <HiOutlineDotsHorizontal />
                    </div>
                  </MenuHandler>
                  <MenuList className="bg-dark-bg border-none shadow-sm shadow-gray-700 min-w-[84px] w-[26px] p-1">
                    {/* <MenuItem className="text-text-1 hover:bg-input hover:text-text-1 text-center p-2">
                      Trả lời
                    </MenuItem> */}
                    <MenuItem
                      onClick={handleDelete}
                      className="text-text-1 hover:bg-input hover:text-text-1 text-center p-2"
                    >
                      Xóa
                    </MenuItem>
                  </MenuList>
                </Menu>
                <div className="max-w-[200px] flex flex-col gap-1">
                  {medias.map((item: string, index: number) => {
                    return (
                      <img
                        key={index}
                        className="w-full h-full object-cover rounded-lg"
                        src={item}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ChatBoxItem;

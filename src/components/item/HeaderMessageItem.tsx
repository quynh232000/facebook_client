import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../redux/reducers/chatBoxReducer";
import { ConversationModel } from "../../types/app";
import avatar_user from "../../assets/base/avatar_user.webp";
import { FormMartDateAgo } from "../functions/tool";
import { RootState } from "../../redux/reducers";

type HeaderMessageItemProps = {
  conversation: ConversationModel;
};
const HeaderMessageItem = ({ conversation }: HeaderMessageItemProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authReducer);

  const handleOpenChat = () => {
    dispatch(openChat(conversation.user));
  };
  return (
    <div
      onClick={() => handleOpenChat()}
      className="flex items-center gap-2 p-2 hover:bg-input rounded-lg cursor-pointer "
    >
      <div className="w-[56px] h-[56px] rounded-full">
        <img
          className="w-full h-full rounded-full object-cover"
          src={conversation.user.avatar ?? avatar_user}
          alt="image"
        />
      </div>
      <div className="flex-1">
        <div className="font-bold text-text-1">
          {conversation.user.first_name + " " + conversation.user.last_name}
        </div>
        <div className={(!conversation?.recent_message?.is_read && (conversation?.recent_message?.user_id != user.id) ?"text-white":"text-text") + " flex items-center  text-[14px]"}>
          <div className="line-clamp-1 flex-1">
            {user.id == conversation.user1_id ||
              (user.id == conversation.user2_id && "Bạn:")}{" "}
            {conversation.recent_message
              ? conversation.recent_message.content
              : "Bắt đầu đoạn Chat nào!"}
          </div>
          {conversation.recent_message && (
            <div className="flex items-center gap-2">
              <span>
                · {FormMartDateAgo(conversation.recent_message.created_at)}{" "}
              </span>
              {!conversation.recent_message.is_read && (conversation.recent_message.user_id != user.id) && (
                <div className="w-[10px] h-[10px] bg-primary-500 rounded-full"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMessageItem;

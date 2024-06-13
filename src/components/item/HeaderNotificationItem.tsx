import { FaCommentDots, FaUser, FaUserCheck } from "react-icons/fa";
import { NotificationModel } from "../../types/app";
import avatar_user from "../../assets/base/avatar_user.webp";
import { FormMartDateAgo } from "../functions/tool";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { readNotification } from "../../services/NotificationService";

type HeaderNotificationItemProps = {
  noti: NotificationModel;
};

const HeaderNotificationItem = ({ noti }: HeaderNotificationItemProps) => {
  const icons: { [key: string]: { class: string; icon: JSX.Element } } = {
    like_post: {
      class: "bg-primary-500",
      icon: <AiFillLike />,
    },
    comment: {
      class: "bg-green-500",
      icon: <FaCommentDots />,
    },

    friend_request: {
      class: "bg-primary-500",
      icon: <FaUser />,
    },
    friend_request_accepted: {
      class: "bg-primary-500",
      icon: <FaUserCheck />,
    },
  };
  const handleRead = () => {
    readNotification(noti.id);
  };
  return (
    <Link
      to={"/" + noti.url}
      onClick={!noti.read_at ? handleRead : () => {}}
      className="flex items-center gap-2 p-2 hover:bg-input rounded-lg cursor-pointer "
    >
      <div className="w-[56px] h-[56px] rounded-full relative">
        <img
          className="w-full h-full rounded-full object-cover"
          src={noti.user.avatar ?? avatar_user}
          alt="image"
        />
        <div
          className={
            icons[noti.type].class +
            " absolute p-2 rounded-full right-0 bottom-0"
          }
        >
          {icons[noti.type].icon}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className={noti.read_at ? "text-gray-500" : ""}>
          <span className="font-bold mr-2">
            {noti.user.first_name + " " + noti.user.last_name}
          </span>
          <span>{noti.message}</span>
        </div>
        <div className="text-primary-500 text-[14px]">
          {FormMartDateAgo(noti.created_at)}
        </div>
      </div>
      <div>
        {!noti.read_at && (
          <div className="w-[10px] h-[10px] rounded-full bg-primary-500"></div>
        )}
      </div>
    </Link>
  );
};

export default HeaderNotificationItem;

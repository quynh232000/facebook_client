import { Link } from "react-router-dom";
import { UserModel } from "../../types/post";
import avatar_user from "../../assets/base/avatar_user.webp";
import {
  AcceptFriendRequest,
  addFriendRequest,
  cancelRequestFriend,
  cancelSendRequestFriend,
} from "../../services/UserService";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
type AddFriendItemProps = {
  type: string;
  user: UserModel;
};
const AddFriendItem = ({ type = "requests", user }: AddFriendItemProps) => {
  const [typeBtn, setTypeBtn] = useState("suggestion");
  const handleAddFriend = () => {
    addFriendRequest(user.id).then((res) => {
      if (res && res.status) {
        setTypeBtn("cancelRequest");
      }
    });
  };
  const handleCancelRequest = () => {
    cancelSendRequestFriend(user.id).then((res) => {
      if (res.status) setTypeBtn("suggestion");
    });
  };
  const [btnAccept, setBtnAccept] = useState("waiting");
  const [deleteFriend, setDeleteFriend] = useState(false);
  const handleAcceptFriend = () => {
    AcceptFriendRequest(user.id).then((res) => {
      res.status && setBtnAccept("accepted");
    });
  };

  const handleDeleteFriend = () => {
    if (btnAccept == "waiting") {
      cancelRequestFriend(user.id).then((res) => {
        if (res.status) setBtnAccept("cancelled");
      });
    }
    setDeleteFriend(true);
  };
  if (deleteFriend) {
    return <></>;
  } else {
    return (
      <div className="border border-input bg-dark-bg rounded-lg overflow-hidden ">
        <div className="w-full h-[240px]">
          <img
            className="w-full h-full object-cover"
            src={user.avatar ?? avatar_user}
            alt=""
          />
        </div>
        <div className="flex flex-col p-3">
          <div className="flex flex-col">
            <Link to={"/user/" + user.uuid} className="font-bold text-[18px]">
              {user.first_name + " " + user.last_name}
            </Link>
            <div className="text-text text-[14px]">
              {user.mutual_friends
                ? user.mutual_friends + " bạn chung"
                : user.friends_count + " bạn bè"}{" "}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4 text-text-1 font-medium">
            {type == "requests" ? (
              btnAccept == "accepted" ? (
                <button className="flex py-2 hover:bg-primary-600 cursor-pointer justify-center items-center mt-4 gap-2 bg-primary-500 rounded-lg">
                  <div className="text-[18px] ">
                    <FaUserCheck />
                  </div>
                  <span className="font-medium">Bạn bè</span>
                </button>
              ) : (
                <button
                  onClick={handleAcceptFriend}
                  className="bg-primary-500 p-2 rounded-lg hover:opacity-80"
                >
                  Xác nhận
                </button>
              )
            ) : typeBtn == "suggestion" ? (
              <button
                onClick={handleAddFriend}
                className="bg-primary-300 text-primary-700 p-2 rounded-lg hover:opacity-80"
              >
                Thêm bạn bè
              </button>
            ) : (
              <button
                onClick={handleCancelRequest}
                className="bg-primary-300 text-primary-700 p-2 rounded-lg hover:opacity-80"
              >
                Hủy yêu cầu
              </button>
            )}
            {btnAccept != "accepted" && (
              <button
                onClick={handleDeleteFriend}
                className="bg-input p-2 rounded-lg hover:opacity-80"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default AddFriendItem;

import { FaClock, FaGraduationCap, FaHeart, FaWifi } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import ImageProfile from "./ImageProfile";
import FriendProfile from "./FriendProfile";
import { ChangeEvent, useEffect, useState } from "react";
import { updateDescription } from "../../../services/UserService";
import { Link } from "react-router-dom";
type RelationshipStatus = 'single' | 'married' | 'dating';
const SidebarUser = () => {
  const stateApp = useSelector((state: RootState) => state.appReducer);
  const authState = useSelector((state: RootState) => state.authReducer);
  const user = stateApp.currentUser;
  // change description
  const [description, setDescription] = useState("");
  const [currentDes, setcurrentDes] = useState(user?.description);
  const [isDes, setIsDes] = useState(false);
  useEffect(()=>{
    setcurrentDes(user?.description);
  },[user])
  const handleInputDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleSaveDes = () => {
    updateDescription({description}).then(res=>{
      console.log(res);
      if(res && res.status){
        setIsDes(false);
        setcurrentDes(description)
      }
    })
  };
const relationship:Record<RelationshipStatus, string>={single:"Đọc thân",married:"Đã kết hôn",dating:"Đang hẹn hò"}
const currentUserRelationship = stateApp.currentUser?.relationship as RelationshipStatus | undefined;

const userRelationshipStatus = currentUserRelationship ? relationship[currentUserRelationship] : undefined;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-dark-bg rounded-lg p-4">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-[20px]">Giới thiệu</div>

          {stateApp.currentUser?.id == authState.user.id ? (
            !isDes ? (
              <>
                <span className="text-center text-[15px]">
                  {currentDes ?? "---"}
                </span>
                <button
                  onClick={() => setIsDes(true)}
                  className="bg-input text-center rounded-lg p-2 hover:bg-gray-700 text-[15px] font-medium"
                >
                  Chỉnh sửa tiểu sử
                </button>
              </>
            ) : (
              <div>
                <textarea
                  onChange={handleInputDescription}
                  className="w-full bg-input p-4 rounded-lg"
                  name=""
                  placeholder="Thêm mô tả"
                  aria-colspan={5}
                  id=""
                  defaultValue={currentDes ?? ""}
                >
                  
                </textarea>
                <div className="flex gap-2 my-2 justify-end">
                  <button
                    onClick={() => setIsDes(false)}
                    className="py-2 px-4 hover:bg-gray-700 bg-input rounded-lg "
                  >
                    Hủy
                  </button>
                  {description && description != user?.description ? (
                    <button
                      onClick={handleSaveDes}
                      className="py-2 px-4  hover:opacity-80 bg-primary-500 cursor-pointer rounded-lg  "
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 cursor-not-allowed bg-input text-gray-600 rounded-lg  "
                    >
                      Lưu
                    </button>
                  )}
                </div>
              </div>
            )
          ) : (
            <span className="text-center text-[15px]">
                  {user?.description ?? "---"}
                </span>
          )}

          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2 text-text">
              <div className="text-[20px]">
                <FaGraduationCap />
              </div>
              <span className="flex gap-2 items-center">
                Học tại
                <span className="text-text-1">Cao đăng FPT Polytechnic</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-text">
              <div className="text-[20px]">
                <FaLocationDot />
              </div>
              <span className="flex gap-2 items-center">
                Sống tại
                <span className="text-text-1">
                  {stateApp?.currentUser?.location ?? "--"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-text">
              <div className="text-[20px]">
                <FaHeart />
              </div>
              <span className="flex gap-2 items-center">{userRelationshipStatus??"Độc thân"}</span>
            </div>
            <div className="flex items-center gap-2 text-text">
              <div className="text-[20px]">
                <FaClock />
              </div>
              <span className="flex gap-2 items-center">
                Tham gia vào
                <span className="text-text-1">
                  {stateApp.currentUser?.created_at.split("T")[0]}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-text">
              <div className="text-[20px]">
                <FaWifi />
              </div>
              <span className="flex gap-2 items-center">
                Có
                <span className="text-text-1">
                  {stateApp.currentUser?.friends_count} người theo dõi
                </span>
              </span>
            </div>
          </div>
          {stateApp.currentUser?.id == authState.user.id ? (
            <Link to={`/user/${stateApp.currentUser?.uuid}/about`} className="bg-input text-center rounded-lg p-2 hover:bg-gray-700 text-[15px] font-medium">
              Chỉnh sửa chi tiết
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {user && <ImageProfile user_uuid={user.uuid} />}

      {user && <FriendProfile user_uuid={user.uuid} />}
    </div>
  );
};

export default SidebarUser;

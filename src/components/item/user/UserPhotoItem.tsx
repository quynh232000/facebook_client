import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { AiOutlinePicture } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/reducers";
import {
  deleteMediaUser,
  setAvatarUser,
  setThumnailUser,
} from "../../../services/UserService";
import { setNotify, updateCurrentUser } from "../../../redux/reducers/appReducer";
import { useState } from "react";

type UserPhotoItemProps = {
  link: string;
  uuid: string;
  i: number;
  type: string;
};
const UserPhotoItem = ({ type, i, uuid, link }: UserPhotoItemProps) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.appReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [isDelete, setIsDelete] = useState(false);
  const handleSetThumbnail = () => {
    setThumnailUser(uuid, i).then((res) => {
      if (res && res.status) {
        // navigate("/user/" + currentUser?.uuid);
        dispatch(updateCurrentUser({thumbnail:res.data.thumbnail}))
        dispatch(
          setNotify({
            type: "success",
            message: res.message,
          })
        );
      }
    });
  };
  const handleSetAvatar = () => {
    setAvatarUser(uuid, i).then((res) => {
      if (res && res.status) {
        dispatch(updateCurrentUser({avatar:res.data.avatar}))
        // navigate("/user/" + currentUser?.uuid);
        dispatch(
          setNotify({
            type: "success",
            message: res.message,
          })
        );
      }
    });
  };
  const handleDelete = () => {
    deleteMediaUser(uuid, i).then((res) => {
      if (res && res.status) {
        setIsDelete(true);
      }
    });
  };
  if (isDelete) {
    return <></>;
  } else {
    return (
      <div className="w-full relative">
        {type == "image" ? (
          <Link
            to={"/photo/" + uuid + "?i=" + (i + 1)}
            className="w-full rounded-lg h-[180px]"
          >
            <img
              className="w-full rounded-lg  h-[180px] object-cover"
              src={link}
              alt=""
            />
          </Link>
        ) : (
          <Link
            to={"/video/" + uuid + "?i=" + (i + 1)}
            className="w-full rounded-lg"
          >
            <video className="h-full w-full rounded-lg object-contain" controls>
              <source src={link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
        )}
        {currentUser?.id == user.id && (
          <div className="bg-input hover:bg-gray-700 cursor-pointer p-2 rounded-full absolute top-[10px] right-[10px]">
            <Menu>
              <MenuHandler>
                <Button className="bg-transparent flex justify-center items-center p-0">
                  <MdModeEdit className="text-[20px]" />
                </Button>
              </MenuHandler>
              <MenuList className="bg-dark-bg border-none text-light-1 font-bold text-[16px] p-2 max-h-[340px] overflow-y-scroll scrollbar_custom max-w-[328px]">
                <MenuItem
                  onClick={handleSetAvatar}
                  className="hover:bg-input flex items-center gap-2 p-2 focus:bg-input"
                >
                  <div className="text-light-1 size-[24px]">
                    <FaRegUserCircle className="size-[20px]" />
                  </div>
                  <div className="text-light-1 flex flex-col gap-1">
                    <div className="text-text-1 font-medium">
                      Đặt làm ảnh đại diện
                    </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={handleSetThumbnail }
                  className="hover:bg-input flex items-center gap-2 p-2 focus:bg-input"
                >
                  <div className="text-light-1 size-[24px]">
                    <AiOutlinePicture className="size-[20px]" />
                  </div>
                  <div className="text-light-1 flex flex-col gap-1">
                    <div className="text-text-1 font-medium">
                      Đặt làm ảnh bìa
                    </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={handleDelete}
                  className="hover:bg-input flex items-center gap-2 p-2 focus:bg-input"
                >
                  <div className="text-light-1 size-[24px]">
                    <FaRegTrashCan className="size-[20px]" />
                  </div>
                  <div className="text-light-1 flex flex-col gap-1">
                    <div className="text-text-1 font-medium">Xóa ảnh</div>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
    );
  }
};

export default UserPhotoItem;

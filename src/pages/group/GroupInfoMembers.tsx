import { IoIosSearch } from "react-icons/io";
import { GroupMemberModel, GroupModel } from "../../types/app";
import { Link } from "react-router-dom";
import avatar_user from "../../assets/base/avatar_user.webp";

type GroupInfoMembersProps = {
  currentGroup: GroupModel;
};
const GroupInfoMembers = ({ currentGroup }: GroupInfoMembersProps) => {
  const members = currentGroup.members;
  console.log(members);

  return (
    <div className="flex  w-full justify-center  flex-1  overflow-y-scroll scrollbar_custom text-text-1">
      <div className="w-680 bg-dark-bg rounded-lg py-2 px-4 min-h-[600px]">
        <div className="border-b border-input py-2">
          <div className="flex gap-2 items-center">
            <strong>Thành viên</strong>
            <span>·</span>
            <div className="text-gray-500 text-sm">{members.length}</div>
          </div>
          <div className="text-gray-500 text-sm">
            Người tham gia nhóm này sẽ hiển thị ở đây.
          </div>
          <div className="flex items-center gap-2 my-4 p-2 rounded-full bg-input">
            <IoIosSearch className="text-xl" />
            <input
              className="flex-1 bg-transparent"
              type="text"
              placeholder="Tìm thành viên"
            />
          </div>
        </div>

        <div className="border-b border-input py-2">
          <div className="flex gap-2 items-center mb-2 text-bold">
            <div className="font-bold">Quản trị viên</div>
          </div>

          <div className="">
            <div className="py-2 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-[60px] h-[60px] rounded-full">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={currentGroup.user.avatar ?? avatar_user}
                    alt=""
                  />
                </div>
                <div>
                  <Link to={"/user/" + currentGroup.user.uuid}>
                    <h5 className="font-bold">
                      {currentGroup.user.first_name +
                        " " +
                        currentGroup.user.last_name}
                    </h5>
                  </Link>
                  <div className="text-[12px] flex gap-2">
                    <span className="bg-primary-300 p-[4px] rounded-lg text-primary-700">
                      Quản trị viên
                    </span>
                    <span className="bg-input p-[4px] rounded-lg ">
                      Người đóng góp nhiều nhất
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500">
                    {currentGroup.user.location ?? "---"}
                  </div>
                </div>
              </div>
              <div>
                {/* <div className="flex items-center gap-1 bg-input py-2 px-3 rounded-lg hover:opacity-80">
                  <FaUserPlus />
                  <button>Thêm bạn bè</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-input py-2">
          <div className="flex gap-2 items-center mb-2 text-bold">
            <div className="font-bold">Tất cả thành viên</div>
          </div>

          <div className="">
            {members.length > 0 ? (
              members.map((member:GroupMemberModel, index:number) => {
                return (
                  <div key={index} className="py-2 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-[60px] h-[60px] rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={member.user.avatar}
                          alt=""
                        />
                      </div>
                      <div>
                        <Link to={"/user/"+member.user.uuid}>
                          <h5 className="font-bold">{member.user.first_name+" "+member.user.last_name}</h5>
                        </Link>
                        <div className="text-[12px] flex gap-2"></div>
                        <div className="text-[12px] text-gray-500">
                          THPT Thăng Long - Hà Nội
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* <div className="flex items-center gap-1 bg-input py-2 px-3 rounded-lg hover:opacity-80">
                        <FaUserPlus />
                        <button>Thêm bạn bè</button>
                      </div> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5">Chưa có thành viên nào</div>
            )}

            <button className="text-center my-4 bg-input p-2 w-full rounded-lg hover:bg-gray-700">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoMembers;

import { GrSearch } from "react-icons/gr";

import { Link } from "react-router-dom";
import { FaCar, FaGamepad, FaHeart, FaRegBell } from "react-icons/fa";
import { FaCircleUser, FaHouse } from "react-icons/fa6";
const Gaming = () => {
  return (
    <div className="flex h-full p-2 md:p-0">
      <div className="w-sidebar bg-dark-bg h-full hidden md:block">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-2 p-4">
            <div className="font-bold text-[26px]">Chơi game</div>
            <div className="flex items-center gap-2 bg-input rounded-full p-2">
              <GrSearch className="text-[20px] text-text ml-2" />
              <input
                type="text"
                placeholder="Tìm kiếm trong phần chơi game"
                className="w-full bg-transparent"
              />
            </div>
          </div>
          <div className="  overflow-y-scroll scrollbar_custom  scrollbar_custom_hidden flex-1 p-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Link
                to={"/gaming"}
                className="flex gap-2 items-center bg-input rounded-lg p-2"
              >
                <div className="text-[20px] bg-primary-500 p-2 rounded-full">
                  <FaGamepad />
                </div>
                <div className="font-bold text-text-1">Chơi game</div>
              </Link>
              <Link
                to={"/gaming?type=you"}
                className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
              >
                <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                  <FaCircleUser />
                </div>
                <div className="font-bold text-text-1">
                  Hoạt động trong game
                </div>
              </Link>
              <Link
                to={"/gaming?type=notifications"}
                className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
              >
                <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                  <FaRegBell />
                </div>
                <div className="font-bold text-text-1">Thông báo</div>
              </Link>
            </div>
            <div className="border-t border-input p-2 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="font-medium text-[18px] text-text-1">
                  Game của bạn
                </div>
                <button className="text-primary-700 text-sm">Xem tất cả</button>
              </div>
              <div className="text-[14px] text-gray-500">
                Hãy lưu game vào phần Game của bạn để tạo lối tắt tại đây.
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  to={"/gaming?type=all"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaGamepad />
                  </div>
                  <div className="font-bold text-text-1">Tất cả game</div>
                </Link>
                <Link
                  to={"/gaming?type=houses"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHouse />
                  </div>
                  <div className="font-bold text-text-1">Hành động</div>
                </Link>
                <Link
                  to={"/gaming?type=family"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHeart />
                  </div>
                  <div className="font-bold text-text-1">Phiêu lưu</div>
                </Link>
                <Link
                  to={"/gaming?type=vehicles"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaCar />
                  </div>
                  <div className="font-bold text-text-1">Chiến đấu</div>
                </Link>
                <Link
                  to={"/gaming?type=houses"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHouse />
                  </div>
                  <div className="font-bold text-text-1">Xây dựng</div>
                </Link>
                <Link
                  to={"/gaming?type=family"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHeart />
                  </div>
                  <div className="font-bold text-text-1">Đánh bài</div>
                </Link>
                <Link
                  to={"/gaming?type=vehicles"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaCar />
                  </div>
                  <div className="font-bold text-text-1">Sòng bạc</div>
                </Link>
                <Link
                  to={"/gaming?type=houses"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHouse />
                  </div>
                  <div className="font-bold text-text-1">Xếp hình</div>
                </Link>
                <Link
                  to={"/gaming?type=family"}
                  className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
                >
                  <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                    <FaHeart />
                  </div>
                  <div className="font-bold text-text-1">Đua xe</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-between  flex-1  overflow-y-scroll scrollbar_custom ">
        <div className="flex w-full justify-center relative flex-1 py-4 gap-4">
          <div className="flex w-user gap-4">
            <div className="flex w-user  flex-1">
              <section className="flex-1 ">
                <div className="flex flex-col gap-4 flex-1">
                  
                  <div>
                    <div className="text-text-1 font-bold text-xl py-2">
                      Game chúng tôi thích
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                      <div className=" relative h-[190px]">
                        <img className=" rounded-lg object-cover w-full h-full" src="https://apkmody.com/wp-content/uploads/2022/10/Hotel-Fever-Tycoon-MOD-APK-cover.jpg" alt="" />
                        <div className=" p-2 absolute bottom-0 left-0 right-0 h-[80px] bg-[rgba(22,22,24,.5)]">
                            <div className="mb-2 font-bold">Hotel Fever Tycoon</div>
                            <span className="bg-dark-bg rounded-full p-2 text-sm">12k người chơi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;

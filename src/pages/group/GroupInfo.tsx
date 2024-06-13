import { useSelector } from "react-redux";

import HeaderGroup from "../../components/shared/user/HeaderGroup";
import GroupSideBar from "./GroupSideBar";
import { RootState } from "../../redux/reducers";

import GroupInfoHome from "./GroupInfoHome";
import { useLocation } from "react-router-dom";
import GroupInfoMembers from "./GroupInfoMembers";

const GroupInfo = () => {
  const { currentGroup } = useSelector((state: RootState) => state.appReducer);
  const location = useLocation();
  const arrayPath = location.pathname.split("/");
  let component: JSX.Element | null = null;
  if (currentGroup) {
    if (arrayPath[3]=='members') {
      component = <GroupInfoMembers currentGroup={currentGroup}/>;
    }else{
      component = <GroupInfoHome currentGroup={currentGroup} />;

    }
  }

  return (
    <div className="flex h-full">
      <GroupSideBar />
      <div className="flex flex-col w-full justify-between  flex-1  overflow-y-scroll scrollbar_custom ">
        <div>
          <HeaderGroup />
        </div>
        <div className="flex w-full justify-center relative flex-1 py-4 gap-4 ">
          {currentGroup ? (
            component
          ) : (
            <div className="text-center py-5">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;

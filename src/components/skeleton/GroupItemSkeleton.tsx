import { Typography } from "@material-tailwind/react";
const GroupItemSkeleton = () => {
  return (
    <div className=" h-fit flex animate-pulse flex-wrap  w-full gap-2 items-center">
      <div className="w-[36px] h-[36px] bg-gray-600 rounded-lg"></div>

      <div className="flex-1 pr-[30px]">
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 w-[120px] h-2  flex-1  bg-gray-700 rounded-full"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2  flex-1  bg-gray-700 rounded-full"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
};

export default GroupItemSkeleton;

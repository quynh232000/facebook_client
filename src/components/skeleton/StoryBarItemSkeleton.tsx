import { Typography } from "@material-tailwind/react";
const StoryBarItemSkeleton = () => {
  return (
      <div className={"animate-pulse flex gap-3 bg-input p-3 rounded-lg"}>
        <div className="w-[56px] h-[56px] p-1 bg-gray-500 rounded-full"></div>
        <div className="flex flex-col gap-1 flex-1 justify-center">
          <div className="font-medium">
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 w-30 h-2  flex-1  bg-gray-700 rounded-full"
            >
              &nbsp;
            </Typography>
          </div>
          <div className="flex items-center gap-1 text-text text-[15px]">
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2  h-2  flex-1  bg-gray-700 rounded-full"
            >
              &nbsp;
            </Typography>
          </div>
        </div>
      </div>
  );
};

export default StoryBarItemSkeleton;

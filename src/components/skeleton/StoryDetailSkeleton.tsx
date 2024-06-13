import { Typography } from "@material-tailwind/react";
const StoryDetailSkeleton = () => {
  return (
    <div className=" flex animate-pulse flex-wrap  w-[425px] bg-dark-bg rounded-lg gap-2 px-2 py-4">
      <div className="flex gap-2 items-center h-fit w-full">
        <div className="w-[40px] h-[40px] bg-gray-600 rounded-full"></div>

        <div className="flex-1 pr-[30px]">
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 w-30 h-2  flex-1  bg-gray-700 rounded-full"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className=" h-2 w-50  flex-1  bg-gray-700 rounded-full"
          >
            &nbsp;
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailSkeleton;

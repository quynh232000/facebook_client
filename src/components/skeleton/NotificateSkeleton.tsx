import { Typography } from "@material-tailwind/react";

const NotificateSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-wrap items-center gap-4 ">
      <div className="grid h-[56px] w-[56px] place-items-center bg-text-1  rounded-full bg-input-1">
        
      </div>
      <div className="flex-1">
       
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-border-1"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-border-1"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-56 rounded-full bg-border-1"
        >
          &nbsp;
        </Typography>
       
      </div>
    </div>
  );
};

export default NotificateSkeleton;

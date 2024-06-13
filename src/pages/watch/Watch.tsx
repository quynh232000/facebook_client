
import { GrSearch } from "react-icons/gr";
import { MdCollectionsBookmark, MdOutlineFeed } from "react-icons/md";
import { Link } from "react-router-dom";
import Post from "../../components/shared/Post";
import { BsCameraReels } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostModel } from "../../types/post";
import { getWatchList } from "../../services/PostService";
import PostSkeleton from "../../components/skeleton/PostSkeleton";
import { Spinner } from "@material-tailwind/react";
const Watch = () => {
  const [posts,setPosts] = useState<PostModel[]>([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(()=>{
    getWatchList(page).then(res=>{
      if (res && res.status) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        res.data.lenght != 10 ? setHasMore(false) : setHasMore(true);
      }
    })
  },[page])
  // loadmore posts
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          hasMore && setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    []
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:block w-sidebar bg-dark-bg h-full">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-2 p-4">
            <div className="font-bold text-[26px]">Video</div>
            <div className="flex items-center gap-2 bg-input rounded-full p-2">
              <GrSearch className="text-[20px] text-text ml-2" />
              <input
                type="text"
                placeholder="Tìm kiếm video"
                className="w-full bg-transparent"
              />
            </div>
          </div>
          <div className="  overflow-y-scroll scrollbar_custom  scrollbar_custom_hidden flex-1 p-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Link
                to={"/watch"}
                className="flex gap-2 items-center bg-input rounded-lg p-2"
              >
                <div className="text-[20px] bg-primary-500 p-2 rounded-full">
                  <MdOutlineFeed />
                </div>
                <div className="font-bold text-text-1">Trang chủ</div>
              </Link>
              <Link
                to={"/watch?type=reel"}
                className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
              >
                <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                <BsCameraReels />
                </div>
                <div className="font-bold text-text-1">Reels</div>
              </Link>
              <Link
                to={"/watch?type=saved"}
                className="flex gap-2 items-center  rounded-lg p-2 hover:bg-input"
              >
                <div className="text-[20px] bg-gray-800  p-2 rounded-full">
                <MdCollectionsBookmark />
                </div>
                <div className="font-bold text-text-1">Video đã lưu</div>
              </Link>

             
             
            </div>
            

          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center overflow-y-scroll scrollbar_custom">
        <div className="flex flex-col p-4 gap-4 w-watch ">
          <div className="text-text font-medium py-2">Video dành cho bạn</div>
          <div className="flex flex-col gap-4">
          {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts?.map((post: PostModel, index) => {
            if (index === posts.length - 1) {
              return (
                <div key={index} ref={lastVideoRef}>
                  <Post post={post} />
                  <div className="py-5 flex justify-center">
                    {hasMore ? (
                      <Spinner color="blue" />
                    ) : (
                      <span>Không còn bài viết nào!</span>
                    )}
                  </div>
                </div>
              );
            } else {
              return <Post post={post} key={index} />;
            }
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-dark-bg rounded-lg p-4">
            <PostSkeleton />
          </div>
          <div className="bg-dark-bg rounded-lg p-4">
            <PostSkeleton />
          </div>
          <div className="bg-dark-bg rounded-lg p-4">
            <PostSkeleton />
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;

import { useCallback, useEffect, useRef, useState } from "react";
import GroupSideBar from "./GroupSideBar";
import { getPostFeed } from "../../services/GroupService";
import Post from "../../components/shared/Post";
import PostSkeleton from "../../components/skeleton/PostSkeleton";
import { PostModel } from "../../types/post";
import { Spinner } from "@material-tailwind/react";
const Groups = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getPostFeed(page).then((res) => {
      if (res && res.status) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        res.data.lenght != 10 ? setHasMore(false) : setHasMore(true);
      }
    });
  }, [page]);
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
      <GroupSideBar />
      <div className="flex-1 flex justify-center overflow-y-scroll scrollbar_custom">
        <div className="flex flex-col py-4 gap-4 w-full md:w-content ">
          <div className="text-text font-medium py-2">Hoạt động gần đây</div>
          <div className="flex flex-col gap-4">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => {
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
              })
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

export default Groups;

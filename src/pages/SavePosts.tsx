import Post from "../components/shared/Post";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostModel } from "../types/post";
import { getSavedPost } from "../services/PostService";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import { Spinner } from "@material-tailwind/react";

const SavePosts = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  

  useEffect(() => {
    getSavedPost(page).then((res) => {
      if (res && res.status) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        res.data.lenght != 10 ? setHasMore(false) : setHasMore(true);
      }
    });
  }, [page]);
  // loadmore posts
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        hasMore && setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);
  return (
    <div className="flex justify-center py-4">
      <div className="w-content flex flex-col gap-4">
        <div className="bg-dark-bg rounded-lg p-4 text-center">
          Bài viết đã lưu
        </div>
        {posts ? (
          posts.length > 0 ? (
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
            // <div className="bg-dark-bg rounded-lg p-4 text-center">
            //   Bạn chưa lưu bài viết nào
            // </div>
            <div className="bg-dark-bg rounded-lg p-4">
              <PostSkeleton />
            </div>
          )
        ) : (
          <div className="bg-dark-bg rounded-lg p-4">
            <PostSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePosts;

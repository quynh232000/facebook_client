import Post from "../../components/shared/Post";
import ImageSkeleton from "../../components/skeleton/ImageSkeleton";
import { PostModel } from "../../types/post";
import CreatePost from "../../components/shared/CreatePost";
import SidebarGroupRight from "../../components/shared/SidebarGroupRight";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPostGroup } from "../../services/GroupService";
import { GroupModel } from "../../types/app";
import { Spinner } from "@material-tailwind/react";
type GroupInfoHomeProps ={
    currentGroup:GroupModel
}
const GroupInfoHome = ({currentGroup}:GroupInfoHomeProps) => {
    const [newPost, setNewPost] = useState<PostModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
      currentGroup &&
        getPostGroup(currentGroup?.uuid,page).then((res) => {
          if (res && res.status) {
            setPosts((prevPosts) => [...prevPosts, ...res.data]);
            res.data.lenght != 10 ? setHasMore(false) : setHasMore(true);

          }
          setIsLoading(false);
        });
    }, [currentGroup,page]);
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
    <div className="flex w-full 2xl:w-user gap-4 px-2">
              <div className="flex w-full  flex-1">
                <section className="flex-1 ">
                  <div className="flex flex-col gap-4 flex-1">
                    {currentGroup && currentGroup.is_joined && (
                      <CreatePost
                        type="group"
                        id={currentGroup.id + ""}
                        setNewPost={setNewPost}
                      />
                    )}
                    {newPost && <Post post={newPost} />}
                    {posts && !isLoading ? (
                      posts.length > 0 ? (
                        (currentGroup.is_private && currentGroup.is_joined) ||
                        !currentGroup.is_private ? (
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
                          <div className="text-center py-5">
                            Bạn không thể xem bài viết của nhóm này vì lí do
                            riêng tư
                          </div>
                        )
                      ) : (
                        <div className="text-center py-5">
                          Chưa có bài viết nào!
                        </div>
                      )
                    ) : (
                      <ImageSkeleton />
                    )}
                  </div>
                </section>
              </div>
              <div className="w-[490px]">
                <SidebarGroupRight />
              </div>
            </div>
  )
}

export default GroupInfoHome
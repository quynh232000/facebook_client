import { useSelector } from "react-redux";
import CreatePost from "../../components/shared/CreatePost";
// import Post from "../../components/shared/Post";
import SidebarUser from "../../components/shared/user/SidebarUser";
import { RootState } from "../../redux/reducers";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPostUser } from "../../services/PostService";
import Post from "../../components/shared/Post";
import PostSkeleton from "../../components/skeleton/PostSkeleton";
import { PostModel } from "../../types/post";
import { Spinner } from "@material-tailwind/react";

const UserProfile = () => {
  const stateApp = useSelector((state: RootState) => state.appReducer);
  const authState = useSelector((state: RootState) => state.authReducer);
  const user = stateApp.currentUser;
  const [newPost, setNewPost] = useState<PostModel | null>(null);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    user &&
      getPostUser(user.uuid, page).then((res) => {
        if (res && res.status) {
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
          res.data.lenght != 10 ? setHasMore(false) : setHasMore(true);
        }
      });
  }, [user, page]);
  // load more posts
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
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full  lg:w-sidebar_user">
        <SidebarUser />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {authState.user.id == stateApp.currentUser?.id ? (
          <CreatePost type="user" id="" setNewPost={setNewPost} />
        ) : (
          ""
        )}

        {newPost && <Post post={newPost} />}
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
  );
};

export default UserProfile;

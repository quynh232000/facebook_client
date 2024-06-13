import { useCallback, useEffect, useRef, useState } from "react";
import CreatePost from "../components/shared/CreatePost";
import Post from "../components/shared/Post";
import Story from "../components/shared/Story";
import SuggestionFriend from "../components/shared/SuggestionFriend";
import { getList } from "../services/PostService";
import { PostModel } from "../types/post";
import { getListUsers, getRequestFriend } from "../services/UserService";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import { Spinner } from "@material-tailwind/react";

const Home = () => {
  // const [page, getPage] = useState(1);
  const [newPost, setNewPost] = useState<PostModel | null>(null);
  const [friendSuggestion, setFriendSuggestion] = useState([]);
  const [requestFriend, setRequestFriend] = useState([]);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getRequestFriend().then((res) => {
      if (res.status) {
        if (res.data.length > 0) {
          setRequestFriend(res.data);
        } else {
          getListUsers().then((res) => {
            res.status && setFriendSuggestion(res.data);
          });
        }
      }
    });
  }, []);
  useEffect(() => {
    getList(page).then((res) => {
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
    <div className="flex flex-col gap-4">
      <Story />

      <CreatePost type="user" id="" setNewPost={setNewPost} />
      {friendSuggestion.length > 0 && (
        <SuggestionFriend
          type={"suggestionFriend"}
          friends={friendSuggestion}
        />
      )}
      {requestFriend.length > 0 && (
        <SuggestionFriend type={"requestFriend"} friends={requestFriend} />
      )}
      {newPost && <Post post={newPost} />}
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
  );
};

export default Home;

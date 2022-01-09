import Moment from 'react-moment';
import ShowMoreText from 'react-show-more-text';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import BarChart from '@mui/icons-material/BarChart';
import Comment from './comment/Comment';
import { useDispatch } from 'react-redux';
import { openCommentModel } from '../../feature/modelSlice';
import { useRouter } from 'next/dist/client/router';
import MenuSection from './MenuSection';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
} from '@firebase/firestore';
import { db } from '../../firebase';

const SingelPost = ({
  postId,
  post,
  textLarge,
  comment,
  isCommentPage,
  commentId,
}) => {
  const [like, setLike] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  //  text truncating function
  console.log(commentId)
  const handleClick = (isExpanded) => {
    console.log(isExpanded);
  };

  // likes setup function

  const handleLikeFunction = async (e) => {
    e.stopPropagation();
    if (isCommentPage) return;
    if (like) {
      await deleteDoc(doc(db, 'post', postId, 'likes', session.user.id));
    } else {
      await setDoc(doc(db, 'post', postId, 'likes', session.user.id), {
        userName: session.user.name,
      });
    }
  };

  // comments featching

  useEffect(() => {
    if (isCommentPage) return;

    return onSnapshot(
      query(
        collection(db, 'post', postId, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, postId]);

  // likes featching

  useEffect(() => {
    if (isCommentPage) return;
    return onSnapshot(collection(db, 'post', postId, 'likes'), (snapshot) => {
      setUserLikes(snapshot.docs);
    });
  }, [db, postId]);
  useEffect(() => {
    if (isCommentPage) return;
    return setLike(
      userLikes.findIndex(
        (carrentLike) => carrentLike.id === session?.user?.id
      ) !== -1
    );
  }, [userLikes]);

  return (
    <>
      <div
        onClick={() => !isCommentPage && router.push(`/${postId}`)}
        className="border-b-2 border-gray-50 cursor-pointer hover:bg-gray-50"
      >
        {/* one section */}
        <div className="flex justify-between py-3 items-start px-3">
          <div className="flex space-x-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post?.userImage || comment?.userImage}
              alt="image"
            />
            <div className="">
              <div className="flex items-center xs:space-x-2 space-x-1">
                <p className="font-semibold text-base cursor-pointer hover:underline">
                  {post?.userName || comment?.userName}
                </p>
                <p className="opacity-60 text-sm">
                  @{post?.userTag || comment?.userTag}
                </p>
                <Moment
                  fromNow
                  className="opacity-75 text-sm hidden xs:inline-block"
                >
                  {post?.timestamp?.toDate() || comment?.timestamp?.toDate()}
                </Moment>
              </div>

              {/* text truncating functionality  */}

              <ShowMoreText
                lines={2}
                more="See More"
                less="Less More"
                expanded={false}
                width={500}
                onClick={handleClick}
                truncatedEndingComponent={'... '}
                className={`opacity-75 ${textLarge && 'text-2xl opacity-100'}`}
              >
                {post?.postTitle || comment?.comment}
              </ShowMoreText>
            </div>
          </div>

          {/* Menu componenet Call here */}

          <MenuSection
            post={post}
            postId={postId}
            comment={comment}
            commentId={commentId}
          />
        </div>

        {/* section two */}

        <div className="px-3 ">
          <img
            className="rounded-lg max-h-96 object-contain shadow-md "
            src={post?.image || comment?.commentImage}
            alt=""
          />
        </div>
        <div className="px-3 py-2 flex items-center max-w-lg justify-between ">
          {/* comment functinility here */}
          <div className="flex items-center space-x-1">
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (isCommentPage) return;
                dispatch(openCommentModel(postId));
              }}
              className="icons"
            >
              <AddCommentOutlinedIcon />
            </span>

            {/* Add Comment Model Component */}

            <Comment />
            {comments.length > 0 && <span>{comments.length}</span>}
          </div>
          <span className="icons">
            <AutorenewOutlinedIcon />
          </span>

          {/* like functility here */}

          <div onClick={handleLikeFunction}>
            <span className="icons hover:text-red-500">
              {like ? (
                <FavoriteIcon className="text-red-600" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </span>
            {userLikes.length > 0 && (
              <span className="text-opacity-50">{userLikes.length}</span>
            )}
          </div>
          <span className="icons">
            <IosShareOutlinedIcon />
          </span>
          {session?.user?.id === post?.userId && (
            <span className="icons">
              <BarChart />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SingelPost;

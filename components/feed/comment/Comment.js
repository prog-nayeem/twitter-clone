import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { closeCommentModel } from '../../../feature/modelSlice';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import CommentChild from './CommentChild';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

// model backdrop css

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const Comment = () => {
  const [post, setPost] = useState();

  const dispatch = useDispatch();
  const { commentModelOpen } = useSelector((state) => state.model);
  const { model, id } = commentModelOpen;

  console.log('comment model open that time geting post id', id);

  // featching particuler clicked post detels and comment that post

  useEffect(() => {
    if (!model) return;
    const unsub = onSnapshot(doc(db, 'post', id), (snapshot) => {
      setPost(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [db, id]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* comment model */}

      <Modal
        className="grid place-items-center"
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={model}
        onClose={(e) => {
          e.stopPropagation();
          dispatch(closeCommentModel());
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* Model top bar here */}

        <Box className=" sm:w-[600px] w-full outline-none bg-white shadow-xl rounded-md -mt-40">
          <div className="border-b-2  border-gray-100 h-14 flex items-center">
            <span
              onClick={(e) => {
                e.stopPropagation();
                dispatch(closeCommentModel());
              }}
              className="icon ml-2 text-black"
            >
              <CloseIcon />
            </span>
          </div>
          <div className="scrollbar-thumb-blue-200 scrollbar-track-gray-50">
            <div className="flex px-3 pt-3 space-x-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={post?.userImage}
                alt="image"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-base cursor-pointer hover:underline">
                    {post?.userName}
                  </p>
                  <p className="opacity-60 text-sm">@{post?.userTag}</p>
                  <Moment fromNow className="opacity-75 text-sm">
                    {post?.timestamp?.toDate()}
                  </Moment>
                </div>
                <p>{post?.postTitle}</p>
                <p className="my-2 text-opacity-70">
                  Replying to{' '}
                  <span className="text-blue-500 text-sm">
                    @{post?.userTag}
                  </span>
                </p>
              </div>
            </div>
            {/* Comment option and icons component */}
            <CommentChild postId={id} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Comment;

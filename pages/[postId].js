import { getProviders, getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Sidebar from '../components/leftSidebar/Sidebar';
import Signin from '../components/signin';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SingelPost from '../components/feed/SingelPost';
import CommentChild from '../components/feed/comment/CommentChild';
import RightSide from '../components/rightSidebar/RightSide';

export default function PostIdPage({ providers, tranding, follow }) {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) return <Signin providers={providers} />;
  const { postId } = router.query;

  console.log('get the single post ', post);
  console.log('get the comment in my database ', comments);
  // single post featching
  if (!post) return router.replace('/');
  useEffect(
    () =>
      onSnapshot(doc(db, 'post', postId), (snaphshot) => {
        setPost(snaphshot.data());
      }),
    [db, postId]
  );

  // all comment featching for firebase

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'post', postId, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snaphshot) => {
          setComments(snaphshot.docs);
        }
      ),
    [db, postId]
  );

  return (
    <div className="min-h-screen">
      <Head>
        <title>{`${post?.userName} Twitter : ${post?.postTitle}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex px-4 max-w-screen-xl mx-auto">
        <Sidebar />
        <div className="flex-grow min-h-screen border-gray-100 max-w-2xl border-2">
          <div className="px-2 flex items-center space-x-5 h-14 sticky -top-0 bg-white border-gray-50 z-40 border-b-2">
            <span onClick={() => router.push('/')} className="icon">
              <ArrowBackIcon />
            </span>
            <h2 className="font-semibold text-xl cursor-pointer">Twitte</h2>
          </div>
          <div className="border-b-2 border-gray-50 pb-2">
            {/* Single Post Component */}

            <SingelPost postId={postId} post={post} textLarge />
            {/* single post component new comment option component */}
            <CommentChild postId={postId} input />

            {/* Comment Show Component here */}
            {comments.length > 0 &&
              comments?.map((careentComment) => (
                <SingelPost
                  key={careentComment.id}
                  comment={careentComment.data()}
                  commentId={careentComment.id}
                  isCommentPage
                />
              ))}
          </div>
        </div>
        <RightSide follow={follow} tranding={tranding} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  const follow = await fetch('https://jsonkeeper.com/b/WWMJ').then((res) =>
    res.json()
  );
  const tranding = await fetch('https://jsonkeeper.com/b/NKEV').then((res) =>
    res.json()
  );
  return {
    props: {
      providers,
      session,
      follow,
      tranding,
    },
  };
}

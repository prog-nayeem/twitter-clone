import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import CircularProgress from '@mui/material/CircularProgress';

import SingelPost from './SingelPost';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [lodding, setLodding] = useState(false);

  // post featching firebase

  useEffect(() => {
    if (lodding) return;
    setLodding(true);
    const unsub = onSnapshot(
      query(collection(db, 'post'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLodding(false);
      }
    );
    return () => {
      unsub();
    };
  }, [db]);

  return (
    <>
      {lodding ? (
        <div className="flex items-center justify-center h-60">
          <CircularProgress />
        </div>
      ) : (
        <>
          {posts.map((carentPost) => (
            <SingelPost
              key={carentPost.id}
              postId={carentPost.id}
              post={carentPost.data()}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Post;

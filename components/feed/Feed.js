import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { useRouter } from 'next/dist/client/router';
import PostFunction from './PostFunction';
import Post from './Post';

const Feed = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex-grow min-h-screen border-2 max-w-2xl border-gray-100">
        <div className="px-3 sticky top-0 z-50 flex items-center bg-white justify-between h-12 font-bold border-b-2 text-xl border-gray-50">
          <h1 className="cursor-pointer" onClick={() => router.push('/')}>
            Home
          </h1>
          <StarBorderPurple500Icon />
        </div>
        <PostFunction />
        <Post />
      </div>
    </>
  );
};

export default Feed;

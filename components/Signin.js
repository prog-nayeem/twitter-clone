import TwitterIcon from '@mui/icons-material/Twitter';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Signin = ({ providers }) => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <>
      <div className="grid place-content-center h-screen -mt-28 space-y-8">
        <TwitterIcon className="text-blue-600" style={{ fontSize: '170px' }} />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-blue-700 rounded-full text-white font-semibold px-5 py-3 hover:bg-blue-600 transition-all duration-100"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Signin;

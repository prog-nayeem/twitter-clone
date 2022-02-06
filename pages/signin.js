import TwitterIcon from "@mui/icons-material/Twitter";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignInComponent = ({ providers }) => {
  const {data:session} = useSession()
  const route = useRouter()
  
    useEffect(() => {
    if (!session) return;
    route.push("/");
  }, [session, route]);
  
  return (
    <>
      <div className="grid place-content-center h-screen -mt-28 space-y-8">
        <TwitterIcon className="text-blue-600" style={{ fontSize: "170px" }} />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-blue-700 animate-pulse active:scale-110 transform rounded-full text-white font-semibold px-5 py-3 hover:bg-blue-600 transition-all duration-100"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SignInComponent;

export async function getServerSideProps(contex) {
  const providers = await getProviders();
  const session = await getSession(contex);
  return {
    props: { providers, session },
  };
}

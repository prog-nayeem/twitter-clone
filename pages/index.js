import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/feed/Feed";
import Sidebar from "../components/leftSidebar/Sidebar";
import Signin from "../components/Signin";
import RightSide from "../components/rightSidebar/RightSide";
import { useEffect } from "react";

export default function Home({ providers, tranding, follow }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return <Signin providers={providers} />;
  }, [session]);

  return (
    <div>
      <Head>
        <title>Twitter - Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex px-4 max-w-screen-xl mx-auto">
        <Sidebar />
        <Feed />
        <RightSide follow={follow} tranding={tranding} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  const follow = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) =>
    res.json().catch((err) => console.log(err.message))
  );
  const tranding = await fetch("https://jsonkeeper.com/b/NKEV").then((res) =>
    res.json().catch((err) => console.log(err.message))
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

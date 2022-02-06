import Head from "next/head";
import Feed from "../components/feed/Feed";
import Sidebar from "../components/leftSidebar/Sidebar";
import RightSide from "../components/rightSidebar/RightSide";
import { useEffect } from "react";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/dist/client/router';

export default function Home({ tranding, follow }) {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
 if(!session) return router.push("/signin")
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
  const follow = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) =>
    res.json().catch((err) => console.log(err.message))
  );
  const tranding = await fetch("https://jsonkeeper.com/b/NKEV").then((res) =>
    res.json().catch((err) => console.log(err.message))
  );
  return {
    props: {
      follow,
      tranding,
    },
  };
}

import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>gamerSite</title>
        <meta name="description" content="Created By BAM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen bg-slate-900 lg:grid-cols-2 ">
        <div>
          <Image
            className="h-full w-full object-cover"
            src="/zelda_cover.jpg"
            width={600}
            height={600}
            alt="zelda_cover"
          />
        </div>
        <div className="boottom-1/2 absolute left-1/2 right-1/2 top-1/2 m-auto w-fit max-w-full -translate-x-1/2 -translate-y-1/2 rounded bg-slate-900 p-10 lg:static lg:transform-none">
          <h1 className="whitespace-nowrap p-5 text-center text-2xl font-bold text-white lg:mb-5 lg:whitespace-normal lg:text-5xl">
            Welcome to - gamerSite
          </h1>
          <p className="pb-3 text-center text-xs text-slate-200 lg:mb-5 lg:text-2xl">
            where you can list, rank your favorite games and share them
          </p>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

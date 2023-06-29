import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import TextInput from "~/components/shared/TextInput";

const Home: NextPage = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  return (
    <>
      <Head>
        <title>gamerSite create profile</title>
        <meta name="description" content="Created By BAM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-900">
        <h1 className="text-xl text-white">Create Profile</h1>
        <form action="">
          <TextInput
            label="Age"
            id="age"
            type="number"
            placeholder="Age"
            key={1}
          />
          <TextInput
            label="user name"
            id="user name"
            type="text"
            placeholder="user name"
            leftIcon={<span className="text-white">@</span>}
            key={1}
          />
        </form>
      </main>
    </>
  );
};

export default Home;

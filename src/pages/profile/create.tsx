import { type NextPage } from "next";
import Head from "next/head";
import Input from "~/components/shared/Input";
import { api } from "~/utils/api";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa6";
import Form from "~/components/shared/Form";

const Home: NextPage = () => {
  const { mutate: createProfile } = api.profile.createProfile.useMutation();

  return (
    <>
      <Head>
        <title>gamerSite create profile</title>
        <meta name="description" content="Created By BAM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-900">
        <h1 className="text-xl text-white">Create Profile</h1>

        <Form
          initialValues={{
            general: { age: 0, username: "" },
            // userName: "",
            twitter: "",
            facebook: "",
            instagram: "",
          }}
          onSubmit={(event, values) => {
            event.preventDefault();
            console.log(event);
            console.log(values);
          }}
          className="grid grid-cols-1 sm:grid-cols-2"
        >
          <Input
            label="Age"
            objectKey="age.age"
            id="age"
            type="number"
            placeholder="Age"
            key={1}
          />
          <Input
            label="user name"
            id="user name"
            type="text"
            placeholder="user name"
            leftIcon={<span className="text-white">@</span>}
            objectKey="userName"
            key={2}
          />
          <Input
            label="twitter"
            id="twitter"
            type="text"
            placeholder="jhon doe"
            objectKey="twitter"
            leftIcon={<FaTwitter className="text-white" />}
            key={3}
          />
          <Input
            label="facebook"
            id="facebook"
            objectKey="facebook"
            type="text"
            placeholder="jhon doe"
            leftIcon={<FaFacebookF className="text-white" />}
            key={4}
          />
          <Input
            label="instagram"
            id="instagram"
            objectKey="instagram"
            type="text"
            placeholder="jhon doe"
            leftIcon={<FaInstagram className="text-white" />}
            key={5}
          />
          <button type="submit" className="bg-green-500">
            submit
          </button>
        </Form>
        {/* <button 
          onClick={() =>
            createProfile({
              preferedConsole: Console.PS4,
            })
          }
        >
          button
        </button> */}
      </main>
    </>
  );
};

export default Home;

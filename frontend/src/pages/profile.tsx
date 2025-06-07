import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../components/Navigation";
import { User } from "../types/user";
import { getUserProfile } from "../services/userServices";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { username } = router.query;

    if (username) {
      getUserProfile(username as string).then((data) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navigation />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/fractalBackground.png")' }} />
        <div className="relative bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-80 backdrop-blur-md p-8 rounded-[20px] shadow-lg w-[750px] z-10 mt-20">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Profile</h1>
          <p className="text-white text-lg mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="text-white text-lg mb-2">
            <strong>Profession:</strong> {user.profession}
          </p>
          <p className="text-white text-lg mb-2">
            <strong>Date of Joining:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
}

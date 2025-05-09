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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Profession:</strong> {user.profession}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Date of Joining:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
}

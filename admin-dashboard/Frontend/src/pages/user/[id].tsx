// src/pages/user/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getUserById } from "../../services/api";

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof id === "string") {
        const userId = parseInt(id, 10);
        const data = await getUserById(userId.toString());

        setUser(data);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>User Details</h1>
        <p>ID: {user.id}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </>
  );
}

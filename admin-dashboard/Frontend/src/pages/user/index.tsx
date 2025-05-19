import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getUsers } from "../../services/api";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]); // Set explicit type here

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>User Management</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/user/${user.id}`}>
                {user.username} ({user.email})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

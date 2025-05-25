import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getUsers, blockUser, unblockUser } from "../../services/api";

interface User {
  id: number;
  username: string;
  profession: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setError("");
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (user: User) => {
    try {
      if (user.blocked) {
        await unblockUser(Number(user.id));
      } else {
        await blockUser(Number(user.id));
      }
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        {error && <p className="text-red-500">{error}</p>}
        {users.length === 0 && !error && <p>No users found.</p>}

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 bg-white rounded shadow-md flex justify-between items-center"
            >
              <div>
                <strong>{user.username}</strong> ({user.profession}) —{" "}
                <span className={user.blocked ? "text-red-500" : "text-green-600"}>
                  {user.blocked ? "Blocked" : "Active"}
                </span>
              </div>
              <button
                onClick={() => handleBlockToggle(user)}
                className={`px-3 py-1 rounded text-white ${
                  user.blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

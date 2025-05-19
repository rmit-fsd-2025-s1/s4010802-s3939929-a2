import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getAdmins } from "../../services/api";

interface Admin {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [admins, setAdmins] = useState<Admin[]>([]); 

  useEffect(() => {
    const fetchAdmins = async () => {
      const data = await getAdmins();
      setAdmins(data);
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Admin Dashboard</h1>
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>
              {admin.username} (Created at: {new Date(admin.createdAt).toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

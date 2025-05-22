import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import { getAdmins } from "../../services/api";

interface Admin {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]); 

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/login");
      return;
    }
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, [router]);

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the secure admin dashboard!</p>

        {admins.length > 0 ? (
          <ul>
            {admins.map((admin) => (
              <li key={admin.id}>
                {admin.username} (Created at: {new Date(admin.createdAt).toLocaleString()})
              </li>
            ))}
          </ul>
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </>
  );
}

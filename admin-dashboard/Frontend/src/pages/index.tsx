import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("isAdmin") === "true";
    setIsAdmin(storedAdmin);
  }, []);

  return (
    <>
      
      <div className="container">
        <h1>Welcome to the Admin Dashboard</h1>
        
        <ul>
          {isAdmin ? (
            <>
              <li>
                <Link href="/admin/manageLecturers" className="button">
                  Manage Lecturers
                </Link>
              </li>
              <li>
                <Link href="/course" className="button">
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link href="/user" className="button">
                  Manage Users
                </Link>
              </li>
              <li>
                <Link href="/admin-report" className="button">
                  Study Selection
                </Link>
              </li>
            </>
          ) : (
            <p>Please log in as an admin to access more features.</p>
          )}
        </ul>
      </div>
    </>
  );
}

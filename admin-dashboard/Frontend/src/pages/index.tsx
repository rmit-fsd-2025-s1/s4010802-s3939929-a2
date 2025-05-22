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
        <h1>Welcome to the TT Webpage</h1>
        
        <ul>
          {isAdmin ? (
            <>
              <li>
                <Link href="/admin" className="button">
                  Admin Dashboard
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
            </>
          ) : (
            <p>Please log in as an admin to access more features.</p>
          )}
        </ul>
      </div>
    </>
  );
}

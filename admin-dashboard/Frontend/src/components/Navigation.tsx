import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedAdmin = sessionStorage.getItem("isAdmin") === "true";

    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
      setIsAdmin(storedAdmin);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isAdmin");
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        TT Webpage
      </Link>

      <div>
        {isLoggedIn ? (
          <>
            <span className="mr-4">Welcome, {username}</span>
            {isAdmin && (
              <>
                <Link href="/admin/manageLecturers" className="button mr-4">Manage Lecturers</Link>
                <Link href="/course" className="button mr-4">Manage Courses</Link>
                <Link href="/user" className="button mr-4">Manage Users</Link>
              </>
            )}
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

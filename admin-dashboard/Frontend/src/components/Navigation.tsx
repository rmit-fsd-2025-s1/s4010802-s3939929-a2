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
    sessionStorage.clear();
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
      <span>Home</span>
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            
          </>
        ) : (
          <Link
            href="/login"
            className="button4"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

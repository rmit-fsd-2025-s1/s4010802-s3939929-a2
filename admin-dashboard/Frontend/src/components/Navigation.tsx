import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        TT Webpage
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <span className="mr-4">Welcome, {username}</span>
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

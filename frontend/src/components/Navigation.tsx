import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const storedUsername = queryParams.get("username");
    const storedProfession = queryParams.get("profession");

    if (storedUsername && storedProfession) {
      setUsername(storedUsername);
      setProfession(storedProfession);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setProfession("");
    router.push("/login");
  };

  return (
    <nav className="bg-transparent backdrop-blur-sm text-white p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/?username=${username}&profession=${profession}`}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
              alt="Site Logo"
              className="w-8 h-8"
            />
          </Link>

          <Link href={`/?username=${username}&profession=${profession}`} className="text-2xl font-bold">
            HOME
          </Link>

          {isLoggedIn && (
            <>
              <Link
                href={`/profile?username=${username}&profession=${profession}`}
                className="text-white hover:text-gray-300 transition-colors ml-4"
              >
                View Profile
              </Link>
              <Link
                href={`/tutor?username=${username}&profession=${profession}`}
                className="text-white hover:text-gray-300 transition-colors ml-4"
              >
                Apply as Tutor
              </Link>
            </>
          )}
        </div>

        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

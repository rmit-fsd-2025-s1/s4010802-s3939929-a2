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
        <div className="flex items-center gap-6">
          {/* Home Button with Image */}
          <Link
            href={`/?username=${username}&profession=${profession}`}
            className="bg-gradient-to-r from-blue-800 to-purple-800 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
              alt="Site Logo"
              className="w-6 h-6"
            />
            HOME
          </Link>

          {/* Conditional Navigation Links */}
          {isLoggedIn && (
            <>
              <Link
                href={`/profile?username=${username}&profession=${profession}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-colors"
              >
                View Profile
              </Link>
              <Link
                href={`/tutor?username=${username}&profession=${profession}`}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 transition-colors"
              >
                Apply as Tutor
              </Link>
            </>
          )}
        </div>

        {/* Login / Logout Button */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-red-400 hover:to-red-500 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";

export default function Navigation() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { username, profession } = router.query;
    if (username && profession) {
      setUsername(username as string);
      setProfession(profession as string);
      setIsLoggedIn(true);
    }
  }, [router.query]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setProfession("");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
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

          
          
          {isLoggedIn && username && (
            <Link
            href={`/profile?username=${username}&profession=${profession}`}
            className="text-white hover:text-gray-300 transition-colors ml-4"
            >
              View Profile
              </Link>
            )}
        </div>

        
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
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

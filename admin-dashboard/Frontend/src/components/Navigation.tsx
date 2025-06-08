import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
     setIsLoggedIn(true);
    }
  }, []);

  

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

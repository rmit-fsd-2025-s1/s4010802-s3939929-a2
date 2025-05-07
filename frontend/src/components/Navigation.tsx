import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import React from "react";


export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Logo image next to HOME */}
          <Link href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
              alt="Site Logo"
              className="w-8 h-8"
            />
          </Link>

          <Link href="/" className="text-2xl font-bold">
            HOME
          </Link>

          {user && (
            <Link
              href="/forum"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Forum
            </Link>
          )}
        </div>

        {/* You can uncomment this block to enable login/logout buttons again */}
        {/* 
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.username}!</span>
              <button
                onClick={logout}
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
        */}  
      </div>
    </nav>
  );
}

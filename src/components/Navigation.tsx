import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-15">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-x20 font-bold">
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
              Logn
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

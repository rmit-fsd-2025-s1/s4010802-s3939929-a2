import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth(); // Check if the user is logged in
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // This ensures we're on the client
  }, []);

  if (!hasMounted) {
    return null; // Or a loading spinner if you'd like
  }

  return (
    <>
      <Head>
        <title>WELCOME</title>
        <meta name="description" content="Welcome to the home page" />
      </Head>

      <Navigation />
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-2xl font-bold">WELCOME</p>

        {!user && (
          <div className="mt-30">
            <Link
              href="/login"
              className="bg-blue-600 px-9 py-3 rounded text-white text-lg font-bold hover:bg-blue-600 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
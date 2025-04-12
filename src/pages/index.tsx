import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  {/* image slider on home page*/}
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=600&auto=format&fit=crop&q=60",
      caption: "Quick Tutor-Lecturer Interaction",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?w=600&auto=format&fit=crop&q=60",
      caption: "Apply as a tutor in seconds",
    },
    {
      image:
        "https://media.istockphoto.com/id/1495320643/photo/smiling-female-teacher-working-on-laptop-in-the-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=RWzlfCNTaN7f6fcl4eSTDu_Iw3UPGBEx82qIX9TE9iI=",
      caption: "Examine as a lecturer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>WELCOME</title>
        <meta name="description" content="Welcome to the home page" />
      </Head>

      {/* Custom Navigation with login on right */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                alt="Home Logo"
                className="w-8 h-8"
              />
            </Link>
            <Link href="/" className="text-2xl font-bold">
              HOME
            </Link>
          </div>
          {!user && (
            <Link
              href="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-700 text-3xl font-bold mb-2">WELCOME</p>
        <p className="text-gray-500 mb-6">
          Helping tutors and lecturers connect and collaborate effectively.
        </p>

        {user && (
          <Link href={user.profession === "Tutor" ? "/tutor" : "/lecturer"}>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Go to your Dashboard
            </button>
          </Link>
        )}
      </div>
      {/*slider details*/}
      <div className="relative max-w-4xl mx-auto mt-8">
        <img
          src={slides[currentIndex].image}
          alt="Slide"
          className="rounded-lg w-full h-100 object-cover shadow"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
          {slides[currentIndex].caption}
        </div>
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full px-2 py-1"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full px-2 py-1"
        >
          ❯
        </button>
      </div>

      
    </>
  );
}
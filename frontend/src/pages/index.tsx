import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=600&auto=format&fit=crop&q=60",
      caption: "Quick Tutor-Lecturer Interaction",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?w=600&auto=format&fit=crop&q=60",
      caption: "Apply as a tutor in seconds",
    },
    {
      image: "https://media.istockphoto.com/id/1495320643/photo/smiling-female-teacher-working-on-laptop-in-the-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=RWzlfCNTaN7f6fcl4eSTDu_Iw3UPGBEx82qIX9TE9iI=",
      caption: "Examine as a lecturer",
    },
  ];

  useEffect(() => {
    const { username, profession } = router.query;
    if (username && profession) {
      setUsername(username as string);
      setProfession(profession as string);
      setIsLoggedIn(true);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [router.query]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setProfession("");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>WELCOME</title>
        <meta name="description" content="Welcome to the home page" />
      </Head>

      
      <nav className="bg-transparent backdrop-blur-sm text-white p-4 fixed top-0 left-0 w-full z-10 border-b-2 border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href={`/?username=${username}&profession=${profession}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                alt="Home Logo"
                className="w-8 h-8"
              />
            </Link>
            <Link href={`/?username=${username}&profession=${profession}`} className="text-gray-800 text-3xl font-bold mb-2 drop-shadow-lg">
              HOME
            </Link>

            {isLoggedIn && (
              <>
                {/* <Link
                  href={`/profile?username=${username}&profession=${profession}`}
                  className="text-white hover:text-gray-300 transition-colors ml-4"
                >
                  View Profile
                </Link> */}
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

      
      <div className="container mx-auto px-4 py-12 text-center mt-20">
        {isLoggedIn ? (
          <>
            <p className="text-gray-800 text-3xl font-bold mb-2 drop-shadow-lg">WELCOME {username}</p>
            <p className="text-gray-700 mb-6 drop-shadow-md">
              Ready to take the next step in your teaching journey?
            </p>

            {profession === "Tutor" && (
              <Link href={`/tutor?username=${username}&profession=${profession}`}>
                <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Apply for Tutor Roles
                </button>
              </Link>
            )}

            {profession === "Lecturer" && (
              <Link href={`/lecturer?username=${username}&profession=${profession}`}>
                <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Apply for Lecturer Roles
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-800 text-3xl font-bold mb-2 drop-shadow-lg">WELCOME</p>
            <p className="text-gray-700 mb-6 drop-shadow-md">
              Helping tutors and lecturers connect and collaborate effectively.
            </p>
          </>
        )}
      </div>
      
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

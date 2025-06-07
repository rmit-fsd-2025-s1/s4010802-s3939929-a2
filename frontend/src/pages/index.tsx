import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation"; // Import Navigation Component
import Head from "next/head"; // Ensure Head is imported correctly

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

      <Navigation /> {/* Use Navigation component for consistent navbar */}

      <div className="container mx-auto px-4 py-12 text-center mt-20">
        {isLoggedIn ? (
          <>
            <p className="text-white text-4xl font-semibold mb-4 drop-shadow-lg">WELCOME {username}</p>
            <p className="text-white text-xl mb-6 drop-shadow-md">
              Ready to take the next step in your teaching journey?
            </p>

            {profession === "Tutor" && (
              <Link href={`/tutor?username=${username}&profession=${profession}`}>
                <button className="mt-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-teal-400 hover:to-teal-500 transition-colors">
                  Apply for Tutor Roles
                </button>
              </Link>
            )}

            {profession === "Lecturer" && (
              <Link href={`/lecturer?username=${username}&profession=${profession}`}>
                <button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-colors">
                  Apply for Lecturer Roles
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <p className="text-white text-4xl font-semibold mb-4 drop-shadow-lg">WELCOME</p>
            <p className="text-white text-xl mb-6 drop-shadow-md">
              Helping tutors and lecturers connect and collaborate effectively.
            </p>
          </>
        )}
      </div>

      <div className="relative max-w-4xl mx-auto mt-8">
        <img
          src={slides[currentIndex].image}
          alt="Slide"
          className="rounded-lg w-full h-100 object-cover shadow-lg"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-md">
          {slides[currentIndex].caption}
        </div>
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full px-3 py-2"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full px-3 py-2"
        >
          ❯
        </button>
      </div>
    </>
  );
}

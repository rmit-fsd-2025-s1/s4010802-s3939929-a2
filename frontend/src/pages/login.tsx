import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../components/Navigation";
import { loginUser, registerUser } from "../services/userServices";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    profession: "",
  });
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login Logic
      const user = await loginUser(formData.username, formData.password, formData.profession);
      if (user) {
        alert(`Logged in successfully as ${user.profession}!`);
        router.push(user.profession === "Tutor" ? "/tutor" : "/lecturer");
      }
    } else {
      // Signup Logic
      const user = await registerUser(formData.username, formData.password, formData.profession);
      if (user) {
        alert(`User registered successfully as ${user.profession}!`);
        setIsLogin(true); // Switch to login after successful signup
      }
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? "Login" : "Signup"} Page</title>
        <meta name="description" content="User authentication page" />
      </Head>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username (Email)
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Profession
              </label>
              <select
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="" disabled>Select Profession</option>
                <option value="Tutor">Tutor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>

            <button
              type="submit"
              className={`${
                isLogin ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded w-full`}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <p>Don't have an account?</p>
                <button
                  className="text-blue-500 hover:text-blue-700 font-bold"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p>Already have an account?</p>
                <button
                  className="text-blue-500 hover:text-blue-700 font-bold"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

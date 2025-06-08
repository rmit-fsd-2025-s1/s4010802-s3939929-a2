import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../components/Navigation";
import { loginUser, registerUser } from "../services/userServices";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profession: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const user = await loginUser(
          formData.username,
          formData.password,
          formData.profession
        );

        if (!user) {
          alert("Login failed. You might be blocked or provided invalid credentials.");
          router.push("/");
          return;
        }

        const { username, profession } = user;
        alert(`Logged in successfully as ${profession}!`);
        router.push(`/?username=${username}&profession=${profession}`);
      } catch (err) {
        console.error("Login crash:", err);
        alert("Unexpected error during login.");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const user = await registerUser(
          formData.username,
          formData.password,
          formData.confirmPassword,
          formData.profession
        );

        if (user) {
          alert(`User registered successfully as ${user.profession}!`);
          setIsLogin(true);
        }
      } catch (err) {
        console.error("Registration crash:", err);
        alert("Unexpected error during registration.");
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

      <div className="relative min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/fractalBackground.png")' }} />
        <div className="relative bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-80 backdrop-blur-md p-8 rounded-[20px] shadow-lg w-[750px] z-10 mt-20">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Username (Email)
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-white bg-black focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-white bg-black focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-white bg-black focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Profession
              </label>
              <select
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-white bg-black focus:outline-none focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Profession</option>
                <option value="Tutor">Tutor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>

            <button
              type="submit"
              className={`${isLogin ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"} text-white font-bold py-2 px-4 rounded-full w-full`}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <p className="text-white">Don&apos;t have an account?</p>
                <button
                  className="text-blue-400 hover:text-blue-600 font-bold"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p className="text-white">Already have an account?</p>
                <button
                  className="text-green-400 hover:text-green-600 font-bold"
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

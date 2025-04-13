import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getStoredUsers } from "../types/user";
import Navigation from "../components/Navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",  
    password: "",
    profession: "",
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = getStoredUsers();

    const user = users.find(
      (u) =>
        u.username === formData.username &&
        u.password === formData.password &&
        u.profession === formData.profession
    );

    if (user) {
      alert(`Logged in successfully as ${user.profession}!`);
      router.push(user.profession === "Tutor" ? "/tutor" : "/lecturer");
    } else {
      alert("Incorrect username, password, or profession.");
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="User login page" />
      </Head>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username (Email)</label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profession</label>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

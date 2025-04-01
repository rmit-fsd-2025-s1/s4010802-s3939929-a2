import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profession: "",
  });

  // Predefined valid credentials
  const validUsers = [
    { email: "john@gmail.com", password: "tutor123", profession: "Tutor" },
    { email: "jack@gmail.com", password: "lecturer123", profession: "Lecturer" },
  ];

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if entered credentials match any predefined ones
    const user = validUsers.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.profession === formData.profession
    );

    if (user) {
      alert(`Logged in successfully as ${user.profession}!`);
      if (user.profession === "Tutor") {
        router.push("/tutor");
      } else if (user.profession === "Lecturer") {
          router.push("/lecturer");
        }
    } else {
      alert("Incorrect email, password, or profession.");
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="User login page" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profession</label>
              <select
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

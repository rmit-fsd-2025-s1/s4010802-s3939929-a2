import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { saveTutorApplication } from "../services/tutorServices";
import Navigation from "../components/Navigation";
import { Course } from "../types/Course";

const TutorPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [courseId, setCourseId] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3004/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter your name.");
    if (!role) return alert("Please select a role.");
    if (!courseId) return alert("Please select a course.");
    if (!availability) return alert("Please select your availability.");
    if (!skills.trim()) return alert("Please list your skills.");
    if (!academicCredentials.trim()) return alert("Please enter your academic credentials.");

    const newApplication = {
      name,
      role,
      courseId: Number(courseId),
      availability,
      skills,
      academicCredentials,
      dateApplied: new Date().toISOString(),
    };

    const response = await saveTutorApplication(newApplication);
    if (response) {
      alert("Application submitted successfully!");
      setName("");
      setRole("");
      setCourseId("");
      setAvailability("");
      setSkills("");
      setAcademicCredentials("");
      router.push("/tutor");
    }
  };

  return (
    <>
      <Head>
        <title>Tutor Application</title>
        <meta name="description" content="Enter Tutor credentials" />
      </Head>
      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/fractalBackground.png")' }} />
        <div className="relative bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 z-10">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Tutor Application
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a role</option>
                <option value="Tutor">Tutor</option>
                <option value="Lab Assistant">Lab Assistant</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Course Selection
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
              >
                <option value="">Select availability</option>
                <option value="part-time">Part Time</option>
                <option value="full-time">Full Time</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Skills
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
                placeholder="List your skills (e.g., React, Node.js, Java)"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Academic Credentials
              </label>
              <textarea
                value={academicCredentials}
                onChange={(e) => setAcademicCredentials(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:border-blue-500"
                placeholder="List your academic credentials"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TutorPage;

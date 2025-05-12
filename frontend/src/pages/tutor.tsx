import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { saveTutorApplication } from "../services/tutorServices";
import Navigation from "../components/Navigation";
import { Course } from "../types/Course";
import { useAuth } from "../context/AuthContext";

const TutorPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [courseId, setCourseId] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/courses");
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

    if (!user) {
      alert("You must be logged in to apply.");
      return;
    }

    const newApplication = {
      userId: user.id,
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

      
      router.push(`/?username=${user.username}&profession=${user.profession}`);
    }
  };

  return (
    <>
      <Head>
        <title>Tutor Application</title>
        <meta name="description" content="Enter Tutor credentials" />
      </Head>
      <Navigation />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Tutor Application</h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="">Select a role</option>
              <option value="Tutor">Tutor</option>
              <option value="Lab Assistant">Lab Assistant</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Course Selection</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="">Select availability</option>
              <option value="Part-time">Part Time</option>
              <option value="Full-time">Full Time</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="List your skills (e.g., React, Node.js, Java)"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Academic Credentials</label>
            <textarea
              value={academicCredentials}
              onChange={(e) => setAcademicCredentials(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="List your academic credentials"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit Application
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorPage;

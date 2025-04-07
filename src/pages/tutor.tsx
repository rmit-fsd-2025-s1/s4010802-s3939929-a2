import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { saveTutorApplication } from "../types/tutorStorage"; // Adjust path if needed

const TutorPage = () => {
  const [course, setCourse] = useState("");
  const [previousRoles, setPreviousRoles] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now().toString(),
      course,
      previousRoles,
      availability,
      skills,
      academicCredentials,
    };

    saveTutorApplication(newApplication);

    alert("Application Submitted!");
    router.push("/"); // Or redirect to a success page
  };

  return (
    <>
      <Head>
        <title>Tutor Page</title>
        <meta name="description" content="Enter Tutor credentials" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Tutor Application</h1>

          {/* Course Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Selection
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a course</option>
              <option value="COSC1234">COSC1234 - Full Stack Development</option>
              <option value="COSC5678">COSC5678 - Data Structures</option>
              <option value="COSC9876">COSC9876 - Machine Learning</option>
            </select>
          </div>

          {/* Previous Roles */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Previous Roles
            </label>
            <textarea
              value={previousRoles}
              onChange={(e) => setPreviousRoles(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="List your previous roles"
            />
          </div>

          {/* Availability */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Availability
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select availability</option>
              <option value="part-time">Part Time</option>
              <option value="full-time">Full Time</option>
            </select>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Skills
            </label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="List your skills (e.g., React, Node.js, Java)"
            />
          </div>

          {/* Academic Credentials */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Academic Credentials
            </label>
            <textarea
              value={academicCredentials}
              onChange={(e) => setAcademicCredentials(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="List your academic credentials"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit Application
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorPage;

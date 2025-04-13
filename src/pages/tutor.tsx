import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { saveTutorApplication } from "../types/tutorStorage";
import Navigation from "../components/Navigation";



const TutorPage = () => {
  //state for each form field
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [previousRoles, setPreviousRoles] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");

  const router = useRouter();
//handle submission and save app
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
//Validation, using trim to manage text input and checks if dropdowns aren't selected 
    if (!name.trim()) return alert("Please enter your name.");
    if (!course) return alert("Please select a course.");
    if (!availability) return alert("Please select your availability.");
    if (!previousRoles.trim()) return alert("Please enter your previous roles.");
    if (!skills.trim()) return alert("Please list your skills.");
    if (!academicCredentials.trim()) return alert("Please enter your academic credentials.");
//prepare app object
    const newApplication = {
      id: Date.now().toString(),
      name,
      course,
      previousRoles,
      availability,
      skills,
      academicCredentials,
    };
//Save and redirect
    saveTutorApplication(newApplication);
    alert("Application Submitted!");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Tutor Page</title>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Course Selection</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="">Select a course</option>
              <option value="COSC1234">COSC1234 - Full Stack Development</option>
              <option value="COSC5678">COSC5678 - Data Structures</option>
              <option value="COSC9876">COSC9876 - Machine Learning</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Previous Roles</label>
            <textarea
              value={previousRoles}
              onChange={(e) => setPreviousRoles(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="List your previous roles"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="">Select availability</option>
              <option value="part-time">Part Time</option>
              <option value="full-time">Full Time</option>
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

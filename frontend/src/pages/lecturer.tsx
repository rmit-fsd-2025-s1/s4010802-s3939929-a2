import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Navigation from "../components/Navigation"; 

export default function LecturerPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredCourse, setFilteredCourse] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: number }>({});
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();
  const [filteredSessionType, setFilteredSessionType] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);


  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const lecturerUsername = router.query.username;
        const response = await fetch(`http://localhost:3004/api/applications?lecturerUsername=${lecturerUsername}`);

        const data = await response.json();
        const assignedApps = data.filter(
          (app: any) => app.course?.assignedLecturer === lecturerUsername
        );

        setApplications(assignedApps);

        const selectionResponse = await fetch("http://localhost:3004/api/selections");
        const selectionData = await selectionResponse.json();
        const selectedCandidatesData = selectionData.reduce((acc: any, selection: any) => {
          acc[selection.application.id] = selection.rank;
          return acc;
        }, {});
        setSelectedCandidates(selectedCandidatesData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (router.query.username) {
      fetchApplications();
    }
  }, [router.query.username]);

  const afterFilter = applications.filter((app) => {
    const matchesCourse = filteredCourse === "" || app.course?.code === filteredCourse;
    const search = searchTerm.toLowerCase();
    const matchesSession = filteredSessionType === "" || app.role === filteredSessionType;
    const matchesSearch =
      searchTerm === "" ||
      (app.course?.courseName && app.course?.courseName.toLowerCase().includes(search)) ||
      (app.name && app.name.toLowerCase().includes(search)) ||
      (app.availability && app.availability.toLowerCase().includes(search)) ||
      (app.skills && app.skills.toLowerCase().includes(search));
    return matchesCourse && matchesSession && matchesSearch;
  });

  const filteredApps = afterFilter.sort((a, b) => {
    if (sortBy === "course") return a.course?.courseName.localeCompare(b.course?.courseName);
    if (sortBy === "availability") return a.availability?.localeCompare(b.availability);
    return 0;
  });

  const selectCandidate = async (id: string) => {
    const newCount = (selectedCandidates[id] || 0) + 1;
    const updated = { ...selectedCandidates, [id]: newCount };
    setSelectedCandidates(updated);

    try {
      await fetch(`http://localhost:3004/api/selections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: id,
          tutorName: applications.find(app => app.id === id)?.name || "Unknown",
          rank: rankings[id] || 0,
          comment: comments[id] || "",
          lecturerUsername: router.query.username || "Unknown",
        }),
      });
    } catch (error) {
      console.error("Error saving selection to DB:", error);
    }
  };

  const submitRankingAndComment = async (id: string) => {
    const rank = rankings[id] || 0;
    const comment = comments[id] || "";

    if (!selectedCandidates[id]) {
      alert("Please select the candidate before submitting ranking/comment.");
      return;
    }

    try {
      await fetch(`http://localhost:3004/api/selections/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank,
          comment,
        }),
      });
      alert("Rank and comment submitted successfully!");
    } catch (error) {
      console.error("Error submitting ranking/comment:", error);
    }
  };

  const updateRanking = (id: string, rank: number) => {
    setRankings((prev) => ({ ...prev, [id]: rank }));
  };

  const updateComment = (id: string, comment: string) => {
    setComments((prev) => ({ ...prev, [id]: comment }));
  };

  const handleLogout = () => {
    router.push("/");
  };

  const chartData = applications.map((app) => ({
    name: app.name,
    selected: selectedCandidates[app.id] ?? 0,
  }));

  const nonZero = chartData.filter((a) => a.selected > 0);
  const mostChosen = nonZero.reduce((a, b) => (a.selected >= b.selected ? a : b), nonZero[0]);
  const notMost = nonZero.filter((a) => a.selected !== mostChosen.selected);
  const leastChosen = notMost.length > 0
    ? notMost.reduce((a, b) => (a.selected <= b.selected ? a : b), notMost[0])
    : null;

  return (
    <>
      <Head>
        <title>Lecturer View</title>
        <meta name="description" content="View tutor applications by course" />
      </Head>

      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 py-10 px-4">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/fractalBackground.png")' }} />
        <div className="relative bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-80 backdrop-blur-md p-8 rounded-[20px] shadow-lg w-[750px] z-10 mt-20"> {/* Slightly smaller width and moved lower */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-white">Tutor Applications</h1>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Filter by Course:</label>
            <select
              value={filteredCourse}
              onChange={(e) => setFilteredCourse(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500 pl-3"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.code}> 
                  {course.code} - {course.courseName}
                </option>
              ))}
              
            </select>
          </div>
           
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Search (Name, Availability, Skills):</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500"
              placeholder="e.g. John, Monday, React"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Filter by Role:</label>
            <select
              value={filteredSessionType}
              onChange={(e) => setFilteredSessionType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500 pl-3"
            >
              <option value="">All Roles</option>
              <option value="Tutor">Tutor</option>
              <option value="Lab Assistant">Lab Assistant</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-1">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500"
            >
              <option value="">None</option>
              <option value="course">Course Name (A-Z)</option>
              <option value="availability">Availability (A-Z)</option>
            </select>
          </div>

          {filteredApps.length === 0 ? (
            <p className="text-center text-gray-600">No applications found.</p>
          ) : (
            <div className="grid gap-6">
              {filteredApps.map((app) => (
                <div key={app.id} className="bg-white shadow-md rounded-lg p-6">
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Course:</strong> {app.course?.courseName}</p>
                  <p><strong>Availability:</strong> {app.availability}</p>
                  <p><strong>Skills:</strong> {app.skills}</p>
                  <p><strong>Academic Credentials:</strong> {app.academicCredentials}</p>
                  <p><strong>Role Selected:</strong> {app.role || "N/A"}</p>

                  <div className="mt-4">
                    <button
                      onClick={() => selectCandidate(app.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    >
                      Select Candidate
                    </button>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-white">Rank (1 = highest preference):</label>
                    <input
                      type="number"
                      min={1}
                      value={rankings[app.id] || ""}
                      onChange={(e) => updateRanking(app.id, Number(e.target.value))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-white">Comments:</label>
                    <textarea
                      value={comments[app.id] || ""}
                      onChange={(e) => updateComment(app.id, e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-full text-white bg-black focus:outline-none focus:border-blue-500"
                      placeholder="Enter comments for this candidate"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => submitRankingAndComment(app.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                    >
                      Submit Ranking & Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Visual Summary of Selections</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} domain={[0, 1]} />
                <Tooltip />
                <Bar dataKey="selected" minPointSize={30}>
                  {chartData.map((entry, index) => {
                    let color = "#3182ce"; //default blue
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getTutorApplications } from "../types/tutorStorage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  getSelectedCandidates,
  saveSelectedCandidates,
} from "../types/selectionStorage";

export default function LecturerPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredCourse, setFilteredCourse] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: number }>({});
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const router = useRouter();

  useEffect(() => {
    const apps = getTutorApplications();
    setApplications(apps);

    const savedSelections = getSelectedCandidates();
    setSelectedCandidates(savedSelections);
  }, []);

  const filteredApps = applications
    .filter((app) => {
      const matchesCourse = filteredCourse ? app.course === filteredCourse : true;
      const matchesSearch =
        searchTerm === "" ||
        app.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.availability?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "course") return a.course.localeCompare(b.course);
      if (sortBy === "availability") return a.availability?.localeCompare(b.availability);
      return 0;
    });

  const selectCandidate = (id: string) => {
    const newCount = (selectedCandidates[id] || 1) + 1;
    const updated = { ...selectedCandidates, [id]: newCount };
    setSelectedCandidates(updated);
    saveSelectedCandidates(updated);
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

  const chartData = applications.map(app => {
    const count = selectedCandidates[app.id] ?? 1; // Default count of 1 (Not Selected)
    return {
      name: app.name,
      selected: count
    };
  });

  const mostChosen = chartData.reduce((a, b) => a.selected > b.selected ? a : b, chartData[0]);
  const leastChosen = chartData.filter(a => a.selected > 1).reduce((a, b) => a.selected < b.selected ? a : b, mostChosen);

  return (
    <>
      <Head>
        <title>Lecturer View</title>
        <meta name="description" content="View tutor applications by course" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">Tutor Applications</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Course:</label>
            <select
              value={filteredCourse}
              onChange={(e) => setFilteredCourse(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Courses</option>
              <option value="COSC1234">COSC1234 - Full Stack Development</option>
              <option value="COSC5678">COSC5678 - Data Structures</option>
              <option value="COSC9876">COSC9876 - Machine Learning</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search (Name, Availability, Skills):</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. John, Monday, React"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
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
              {filteredApps.map((app, index) => (
                <div key={app.id || index} className="bg-white shadow-md rounded-lg p-6">
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Course:</strong> {app.course}</p>
                  <p><strong>Availability:</strong> {app.availability}</p>
                  <p><strong>Skills:</strong> {app.skills}</p>
                  <p><strong>Academic Credentials:</strong> {app.academicCredentials}</p>

                  <div className="mt-4">
                    <button
                      onClick={() => selectCandidate(app.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Select Candidate
                    </button>
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Rank (1 = highest preference):</label>
                    <input
                      type="number"
                      min={1}
                      value={rankings[app.id] || ""}
                      onChange={(e) => updateRanking(app.id, Number(e.target.value))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Comments:</label>
                    <textarea
                      value={comments[app.id] || ""}
                      onChange={(e) => updateComment(app.id, e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      placeholder="Enter comments for this candidate"
                    />
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
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="selected">
                  {chartData.map((entry, index) => {
                    let color = "#e53e3e"; // Default red for "Not Selected"

                    if (entry.selected > 1) {
                      if (entry.name === mostChosen.name) {
                        color = "#38a169"; // Green
                      } else {
                        color = "#dd6b20"; // Orange
                      }
                    }

                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>

              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p><span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>Most Chosen</p>
              <p><span className="inline-block w-4 h-4 bg-orange-500 mr-2"></span>Least Chosen</p>
              <p><span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>Not Selected</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
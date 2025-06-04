import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PROFILES,
  SELECT_CANDIDATE,
  UPDATE_RANKING,
  UPDATE_COMMENT,
  BLOCK_USER,
  UNBLOCK_USER
} from "../services/graphql";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function LecturerPage() {
  const [filteredCourse, setFilteredCourse] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: number }>({});
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const router = useRouter();

  // Fetch profiles (tutor applications) using Apollo Client
  const { data, loading, error } = useQuery(GET_PROFILES);

  // Mutations to select a candidate, update rankings and comments
  const [selectCandidateMutation] = useMutation(SELECT_CANDIDATE);
  const [updateRankingMutation] = useMutation(UPDATE_RANKING);
  const [updateCommentMutation] = useMutation(UPDATE_COMMENT);
  const [blockUserMutation] = useMutation(BLOCK_USER);
  const [unblockUserMutation] = useMutation(UNBLOCK_USER);

  // Handle logout
  const handleLogout = () => {
    router.push("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter and sort applications (profiles)
  const filteredApps = (data.profiles || []).filter((app: any) => {
    const matchesCourse = filteredCourse === "" || app.course === filteredCourse;
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      (app.course && app.course.toLowerCase().includes(search)) ||
      (app.username && app.username.toLowerCase().includes(search)) ||
      (app.availability && app.availability.toLowerCase().includes(search)) ||
      (app.skills && app.skills.toLowerCase().includes(search));

    return matchesCourse && matchesSearch;
  }).sort((a: any, b: any) => {
    if (sortBy === "course") return a.course.localeCompare(b.course);
    if (sortBy === "availability") return a.availability?.localeCompare(b.availability);
    return 0;
  });

  // Handle selecting a candidate
  const handleSelectCandidate = async (id: string) => {
    try {
      await selectCandidateMutation({ variables: { id } });
      const newCount = (selectedCandidates[id] || 0) + 1;
      setSelectedCandidates((prev) => ({ ...prev, [id]: newCount }));
    } catch (error) {
      console.error("Failed to select candidate", error);
    }
  };

  // Handle updating rankings
  const handleUpdateRanking = async (id: string, rank: number) => {
    try {
      await updateRankingMutation({ variables: { id, rank } });
      setRankings((prev) => ({ ...prev, [id]: rank }));
    } catch (error) {
      console.error("Failed to update ranking", error);
    }
  };

  // Handle updating comments
  const handleUpdateComment = async (id: string, comment: string) => {
    try {
      await updateCommentMutation({ variables: { id, comment } });
      setComments((prev) => ({ ...prev, [id]: comment }));
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  // Handle blocking/unblocking users
  const handleBlockUser = async (id: string) => {
    try {
      await blockUserMutation({ variables: { id } });
    } catch (error) {
      console.error("Failed to block user", error);
    }
  };

  const handleUnblockUser = async (id: string) => {
    try {
      await unblockUserMutation({ variables: { id } });
    } catch (error) {
      console.error("Failed to unblock user", error);
    }
  };

  const chartData = filteredApps.map((app: any) => {
    const count = selectedCandidates[app.id] ?? 0;
    return { name: app.username, selected: count };
  });

  const nonZero = chartData.filter((a) => a.selected > 0);
  const mostChosen = nonZero.reduce((a, b) => (a.selected >= b.selected ? a : b), nonZero[0]);
  const notMost = nonZero.filter((a) => a.selected !== mostChosen.selected);
  const leastChosen = notMost.length > 0 ? notMost.reduce((a, b) => (a.selected <= b.selected ? a : b), notMost[0]) : null;

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
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">Logout</button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Course:</label>
            <select value={filteredCourse} onChange={(e) => setFilteredCourse(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Courses</option>
              <option value="COSC1234">COSC1234 - Full Stack Development</option>
              <option value="COSC5678">COSC5678 - Data Structures</option>
              <option value="COSC9876">COSC9876 - Machine Learning</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search (Name, Availability, Skills):</label>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. John, Monday, React" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
              <option value="">None</option>
              <option value="course">Course Name (A-Z)</option>
              <option value="availability">Availability (A-Z)</option>
            </select>
          </div>

          {filteredApps.length === 0 ? (
            <p className="text-center text-gray-600">No applications found.</p>
          ) : (
            <div className="grid gap-6">
              {filteredApps.map((app: any, index: number) => (
                <div key={app.id || index} className="bg-white shadow-md rounded-lg p-6">
                  <p><strong>Name:</strong> {app.username}</p>
                  <p><strong>Course:</strong> {app.course}</p>
                  <p><strong>Availability:</strong> {app.availability}</p>
                  <p><strong>Skills:</strong> {app.skills}</p>

                  <button onClick={() => handleSelectCandidate(app.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Select Candidate</button>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rank:</label>
                    <input type="number" min={1} value={rankings[app.id] || ""} onChange={(e) => handleUpdateRanking(app.id, Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comments:</label>
                    <textarea value={comments[app.id] || ""} onChange={(e) => handleUpdateComment(app.id, e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <button onClick={() => handleBlockUser(app.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Block</button>
                    <button onClick={() => handleUnblockUser(app.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Unblock</button>
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
                <Bar dataKey="selected" minPointSize={30}>
                  {chartData.map((entry, index) => {
                    let color = "#3182ce"; // Default blue
                    if (entry.selected === 0) color = "#e53e3e"; // Red
                    else if (entry.selected === mostChosen.selected) color = "#38a169"; // Green
                    else if (leastChosen && entry.selected === leastChosen.selected) color = "#dd6b20"; // Orange
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

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getTutorApplications } from "../types/tutorStorage";

export default function LecturerPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredCourse, setFilteredCourse] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: boolean }>({});
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const router = useRouter();

  useEffect(() => {
    const apps = getTutorApplications();
    setApplications(apps);
  }, []);

  const filteredApps = applications
    .filter((app) => {
      const matchesCourse = filteredCourse ? app.course === filteredCourse : true;
      const matchesSearch =
        searchTerm === "" ||
        app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.availability?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "course") {
        return a.course.localeCompare(b.course);
      } else if (sortBy === "availability") {
        return a.availability?.localeCompare(b.availability);
      }
      return 0;
    });

  const toggleCandidateSelection = (id: string) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateRanking = (id: string, rank: number) => {
    setRankings((prev) => ({
      ...prev,
      [id]: rank,
    }));
  };

  const updateComment = (id: string, comment: string) => {
    setComments((prev) => ({
      ...prev,
      [id]: comment,
    }));
  };

  const handleLogout = () => {
    router.push("/");
  };

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

          {/* Course Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Course:
            </label>
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

          {/* Search Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search (Name, Availability, Skills):
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. John, Monday, React"
            />
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by:
            </label>
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

          {/* Application List */}
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
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={!!selectedCandidates[app.id]}
                        onChange={() => toggleCandidateSelection(app.id)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Select Candidate</span>
                    </label>
                  </div>

                  {selectedCandidates[app.id] && (
                    <>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Rank (1 = highest preference):
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={rankings[app.id] || ""}
                          onChange={(e) => updateRanking(app.id, Number(e.target.value))}
                          className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Comments:
                        </label>
                        <textarea
                          value={comments[app.id] || ""}
                          onChange={(e) => updateComment(app.id, e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded"
                          placeholder="Enter comments for this candidate"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

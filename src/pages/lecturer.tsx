import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getTutorApplications } from "../types/tutorStorage"; 

export default function LecturerPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredCourse, setFilteredCourse] = useState<string>("COSC1234");
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: boolean }>({});
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    const apps = getTutorApplications();
    setApplications(apps);
  }, []);

  const filteredApps = applications.filter((app) => app.course === filteredCourse);

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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Course:
            </label>
            <select
              value={filteredCourse}
              onChange={(e) => setFilteredCourse(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="COSC1234">COSC1234 - Full Stack Development</option>
              <option value="COSC5678">COSC5678 - Data Structures</option>
              <option value="COSC9876">COSC9876 - Machine Learning</option>
            </select>
          </div>

          {filteredApps.length === 0 ? (
            <p className="text-center text-gray-600">No applications found for this course.</p>
          ) : (
            <div className="grid gap-6">
              {filteredApps.map((app, index) => (
                <div key={app.id || index} className="bg-white shadow-md rounded-lg p-6">
                  <p><strong>Course:</strong> {app.course}</p>
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
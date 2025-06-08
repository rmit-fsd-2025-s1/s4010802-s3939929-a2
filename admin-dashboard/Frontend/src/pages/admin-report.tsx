import { gql, useQuery } from "@apollo/client";
import React from "react";
import Head from "next/head";
import Navigation from "../components/Navigation";
const GET_REPORTS = gql`
  query {
    candidatesPerCourse
    tutorsChosenForMoreThan3Courses
    unselectedTutors
  }
`;
type CandidatesPerCourseData = {
  candidatesPerCourse: string[][];
  tutorsChosenForMoreThan3Courses: string[];
  unselectedTutors: string[];
};
const AdminReports: React.FC = () => {
  const { data, loading, error } = useQuery<CandidatesPerCourseData>(GET_REPORTS);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">Loading reports...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">Error loading reports.</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Admin Reports</title>
      </Head>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Candidates Per Course</h1>

            {data?.candidatesPerCourse.length === 0 ? (
              <p className="text-center text-gray-500">No candidates selected yet.</p>
            ) : (
              data?.candidatesPerCourse.map((group, idx) => (
                <div key={idx} className="mb-6">
                  <h2 className="text-xl font-semibold text-purple-700 mb-2">{group[0]}</h2>
                  <ul className="list-disc list-inside text-gray-800 pl-4">
                    {group.slice(1).map((name, i) => (
                      <li key={i} className="ml-2">{name}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </section>
          <section>
            <h1 className="text-3xl font-bold text-center mb-6 text-red-700">
              Tutors Chosen for More Than 3 Courses
            </h1>
            {data?.tutorsChosenForMoreThan3Courses.length === 0 ? (
              <p className="text-center text-gray-500">No tutors have been chosen for more than 3 courses.</p>
            ) : (
              <ul className="list-disc list-inside text-gray-800 pl-4">
                {data?.tutorsChosenForMoreThan3Courses.map((tutor, index) => (
                  <li key={index}>{tutor}</li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
              Tutors Not Chosen for Any Course
            </h1>
            {data?.unselectedTutors.length === 0 ? (
              <p className="text-center text-gray-500">All tutors have been selected for at least one course.</p>
            ) : (
              <ul className="list-disc list-inside text-gray-800 pl-4">
                {data?.unselectedTutors.map((tutor, index) => (
                  <li key={index}>{tutor}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminReports;

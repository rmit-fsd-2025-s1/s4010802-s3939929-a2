import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getUsers, getCourses, assignLecturer } from "../../services/api";
import { Course, User } from "../../types/types";

export default function ManageLecturersPage() {
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const users = await getUsers();
        const courseList = await getCourses();
        setLecturers(users.filter((u: User) => u.profession === "Lecturer"));
        setCourses(courseList);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
fetchData();
}, []);

const handleAssign = async (courseId: number, lecturerUsername: string) => {
    try {
        await assignLecturer(Number(courseId), lecturerUsername);
        alert(`Assigned ${lecturerUsername} to course successfully.`);
    } catch (error) {
      console.error("Error assigning lecturer:", error);
      alert("Failed to assign lecturer.");
    }
};

if (loading) return <p>Loading...</p>

return (
    <>
    <Navigation />
    <div className="container">
    <h1 className="text-2xl font-bold mb-6">Manage Lecturers</h1>
    {lecturers.map((lec) => (
        <div key={lec.id} className="mb-6 p-4 border rounded bg-white shadow">
        <h2 className="text-lg font-semibold mb-3">{lec.username}</h2>
        <div className="grid gap-2">
        {courses.map((course) => (
            <div
            key={course.id}
            className="flex justify-between items-center border p-2 rounded"
            >
            <div>
            <strong>{course.code}</strong> - {course.courseName}
            </div>
            <button
            className="button6"
            onClick={() => handleAssign(course.id, lec.username)}
            >
            Assign
            </button>
            </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

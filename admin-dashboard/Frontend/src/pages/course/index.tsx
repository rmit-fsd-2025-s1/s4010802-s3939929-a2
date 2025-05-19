import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getCourses } from "../../services/api";
import Link from "next/link";

interface Course {
  id: number;
  courseName: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CourseDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Course Management</h1>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/course/${course.id}`}>
                {course.courseName} ({course.code}) - {course.description}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

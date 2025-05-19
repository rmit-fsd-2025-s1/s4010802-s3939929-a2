import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { getCourseById } from "../../services/api";

interface Course {
  id: number;
  courseName: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (typeof id === "string") {
        const data = await getCourseById(id.toString());
        setCourse(data);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Course Details</h1>
        <p>ID: {course.id}</p>
        <p>Course Name: {course.courseName}</p>
        <p>Code: {course.code}</p>
        <p>Description: {course.description}</p>
        <p>Created At: {new Date(course.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(course.updatedAt).toLocaleString()}</p>
      </div>
    </>
  );
}

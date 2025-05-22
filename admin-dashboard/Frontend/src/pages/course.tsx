import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/api";

interface Course {
  id: number;
  courseName: string;
  code: string;
  description: string;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    code: "",
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await createCourse(newCourse);
      setNewCourse({ courseName: "", code: "", description: "" });
      fetchCourses();
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const handleUpdate = async () => {
    if (editId !== null) {
      try {
        await updateCourse(Number(editId), newCourse);
        setEditId(null);
        setNewCourse({ courseName: "", code: "", description: "" });
        fetchCourses();
      } catch (error) {
        console.error("Failed to update course:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(Number(id));
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
        <div className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={(e) =>
              setNewCourse({ ...newCourse, courseName: e.target.value })
            }
            className="input mr-2"
          />
          <input
            type="text"
            placeholder="Code"
            value={newCourse.code}
            onChange={(e) =>
              setNewCourse({ ...newCourse, code: e.target.value })
            }
            className="input mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="input mr-2"
          />
          <button
            onClick={editId !== null ? handleUpdate : handleCreate}
            className="button"
          >
            {editId !== null ? "Update Course" : "Add Course"}
          </button>
        </div>
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course.id}
              className="p-4 bg-white rounded shadow-md flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <strong>{course.courseName}</strong> ({course.code}) - {course.description}
              </div>
              <div className="mt-2 md:mt-0 space-x-2">
                <button
                  onClick={() => {
                    setEditId(course.id);
                    setNewCourse({
                      courseName: course.courseName,
                      code: course.code,
                      description: course.description,
                    });
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

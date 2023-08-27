import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../config";

export default function Courses({ history }) {
  const [coursesData, setCourses] = useState([]);

  // Run Once
  useEffect(() => {
    const getCourses = async () => {
      await axios
        .get(config.apiBaseUrl + "/courses")
        .then((response) => {
          setCourses(response.data.courses);
        })
        .catch((error) => {
          history.push({ pathname: "/error", state: { error: error.message } });
        });
    };
    getCourses();
  }, [history]);

  const courseList = coursesData.map((course) => {
    return (
      <Link
        className="course--module course--link"
        to={`/courses/${course.id}`}
        key={course.id}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    );
  });

  return (
    <main>
      <div className="wrap main--grid">
        {courseList}
        <Link
          to="/courses/create"
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            {" "}
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
}

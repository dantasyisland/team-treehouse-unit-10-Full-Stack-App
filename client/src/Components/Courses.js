import axios from 'axios';
import React, { useState, useEffect } from 'react';

import URL from '../config';

export default function Courses() {
  const [courseData, setCourses] = useState([]);

  const getCourses = async () => {
    await axios.get(URL + '/courses').then((response) => {
      setCourses(response.data.courses);
    });
  };

  // Run Once
  useEffect(() => {
    getCourses();
  }, []);

  const courseList = courseData.map((course) => {
    return (
      <>
        <a className="course--module course--link" href="course-detail.html">
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
      </>
    );
  });

  return (
    <main>
      <div className="wrap main--grid">
        {courseList}
        <a
          href="create-course.html"
          className="course--module course--add--module">
          <span className="course--add--title">
            {' '}
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              class="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </a>
      </div>
    </main>
  );
}

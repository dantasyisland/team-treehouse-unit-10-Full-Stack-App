import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import URL from '../config';
// Access params - id from useParams hook react router
// fetch - same way

export default function CourseDetail() {
  const [courseData, setCourse] = useState({});

  const getCourse = async () => {
    await axios.get(URL + '/courses/' + id).then((response) => {
      setCourse(response.data.course);
      console.log(response.data.course);
    });
  };
  const { id } = useParams();

  // Run Once
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a href="update-course.html" className="button">
            Update Course
          </a>
          <a href="#delete" className="button">
            Delete Course
          </a>
          <a href="index.html" className="button button-secondary">
            Return to List
          </a>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form action="">
            <div className="main--flex">
              <h3 className="course--detail--title">{courseData.title}</h3>
              <h4 className="course--name">{courseData.title}</h4>
              <p>
                {`By ${courseData.user.firstName} ${courseData.user.lastName}`}
              </p>
              {/* GO THROUGH description there are line breaks regular js attempt - loop through at \n? wrap p around */}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

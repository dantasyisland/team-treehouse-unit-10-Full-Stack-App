import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import URL from "../config";
// Access params - id from useParams hook react router
// fetch - same way
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const [course, setCourse] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(URL + "/courses/" + id);
      setCourse(result.data.course);
      setIsLoaded(true);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (isLoaded) console.log({ course });
  }, [course, isLoaded]);

  const handleDelete = () => {
    console.log("delete button");
  };

  if (isLoaded) {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link to="/courses/:id/update" className="button">
              Update Course
            </Link>
            <button className="button" onClick={handleDelete}>
              Delete Course
            </button>
            {/* COPY PASTE LINKS BUT REFER TO PATH */}
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
          </div>
          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">{course.title}</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>{course.user.firstName}</p>
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>
                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown className="course--detail--list">
                    {course.materialsNeeded}
                  </ReactMarkdown>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

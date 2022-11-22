import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import config from "../config";
import ReactMarkdown from "react-markdown";

export default function CourseDetail({ context, history }) {
  const { authenticatedUser } = context;
  const [course, setCourse] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config.apiBaseUrl + "/courses/" + id);
      setCourse(result.data.course);
      console.log(result); // Log result
      if (result.data.course == null) {
        history.push("/notfound");
      } else {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [id, history]);

  useEffect(() => {}, [course]);

  const handleDelete = () => {
    if (authenticatedUser !== null) {
      context.actions
        .deleteCourse(
          id,
          authenticatedUser.user.emailAddress,
          authenticatedUser.user.password
        )
        .then((res) => {
          console.log(res.status);
          if (res.status === 204) {
            history.push("/");
          } else {
          }
        });
    }
  };

  if (isLoaded) {
    const authenticatedActions =
      authenticatedUser !== null &&
      authenticatedUser.user.emailAddress === course.user.emailAddress ? (
        <>
          <Link to={`/courses/${id}/update`} className="button">
            Update Course
          </Link>
          <Link to={"#"} onClick={handleDelete} className="button">
            Delete Course
          </Link>
        </>
      ) : null; // not loaded true but course is null
    return course !== null ? (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {authenticatedActions}
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
          </div>
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
      </main>
    ) : (
      <p>Course Not Found</p>
    );
  }
}

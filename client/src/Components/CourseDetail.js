import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import apiBaseUrl from "../config";
import ReactMarkdown from "react-markdown";

export default function CourseDetail({ context, history }) {
  const { authenticatedUser } = context; // authenticated user object from context - if user is authenticated

  const [course, setCourse] = useState({});
  const [isLoaded, setIsLoaded] = useState(false); // set to true once course is loaded
  const { id } = useParams();
  // Fetch course data from API on initial load
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiBaseUrl + "/courses/" + id).catch(
        (error) => {
          history.push({ pathname: "/error", state: { error: error.message } });
        }
      );
      setCourse(result.data.course);
      if (result.data.course == null) {
        history.push("/notfound");
      } else {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [id, history]);

  useEffect(() => {}, [course]);
  // Event handler for delete button. If user is authenticated, call deleteCourse function from context to delete the course
  const handleDelete = () => {
    if (authenticatedUser !== null) {
      context.actions
        .deleteCourse(
          id,
          authenticatedUser.user.emailAddress,
          authenticatedUser.user.password
        )
        .then((res) => {
          if (res.status === 204) {
            history.push("/");
          } else {
          }
        })
        .catch((error) => {
          history.push({ pathname: "/error", state: { error: error.message } });
        });
    }
  };
  // If course is loaded, render CourseDetail component
  if (isLoaded) {
    // If user is authenticated, render buttons to update and delete course
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

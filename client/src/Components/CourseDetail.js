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
      setIsLoaded(true);
    };

    fetchData();
  }, [id]);

  const handleDelete = () => {
    const { user } = authenticatedUser;

    /**
     * Cannot read properties of undefined - what is deleteCourse from context returning? - handle forbidden
     */

    /*
    if (authenticatedUser !== null) {
      context.actions.deleteCourse(id, user.emailAddress, user.password);
      // .then((response) => {
      //   // console.log(response);
      //   // if (response.status !== 204) {
      //   // } else {
      //   //   history.push("/");
      //   // }
      // });
      history.push("/");
    } else {
      history.push("/signin");
    }
*/

    /*
    const {
      context: {
        authenticatedUser: { user },
      },
    } = this.props;
    const { course } = this.state;

    this.props.context.actions
      .updateCourse(course, user.emailAddress, user.password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      });

    */
  };

  const authenticatedActions =
    authenticatedUser !== null ? (
      <>
        <Link to={`/courses/${id}/update`} className="button">
          Update Course
        </Link>
        <button className="button" onClick={handleDelete}>
          Delete Course
        </button>
      </>
    ) : null;

  if (isLoaded) {
    return course !== null ? (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {/* COPY PASTE LINKS BUT REFER TO PATH */}
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
            {authenticatedActions}
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
    ) : (
      <p>Course Not Found</p>
    );
  }
}

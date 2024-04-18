import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import apiBaseUrl from "../config";
// Class Component for updating courses. Will render a form component
export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      course: {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
      },
      errors: [],
      authorized: false,
    };
  }

  componentDidMount() {
    const course = async () => {
      // id from params
      const { id } = this.props.match.params;
      // API call for course will check if the user is authorized to update the course
      await axios(apiBaseUrl + "/courses/" + id)
        .then((response) => {
          if (response.data.course == null) {
            this.props.history.push("/notfound");
          } else if (
            response.data.course.user.emailAddress !==
            this.props.context.authenticatedUser.user.emailAddress
          ) {
            this.props.history.push("/forbidden");
          } else {
            this.setState({ course: response.data.course });
          }
        })
        // If there is an error then redirect to error page
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: { error: error.message },
          });
        });
    };

    course();
  }
  // Event handler for form change events
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        ...this.state,
        course: {
          ...this.state.course,
          [name]: value,
        },
      };
    });
  };
  // Event handler for form submit events will call the updateCourse function from context to update the course
  submit = () => {
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
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: { error: error.message },
        });
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
  // Renders Form Component With Information Relevant to Update Course
  render() {
    const {
      context: {
        authenticatedUser: { user },
      },
    } = this.props;

    const { title, description, estimatedTime, materialsNeeded } =
      this.state.course;

    return (
      <Form
        className={"wrap"}
        headerText={"Update Course"}
        submit={this.submit}
        submitButtonText={"Update Course"}
        cancel={this.cancel}
        errors={this.state.errors}
        elements={
          <>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">
                  Course Title
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change}
                    placeholder="Course Title"
                  />
                </label>
                <p>
                  By{" "}
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </p>
                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Course Description"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="estimatedTime">
                  Estimated Time
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={this.change}
                    placeholder="Estimated Time"
                  />
                </label>
                <label htmlFor="materialsNeeded">
                  Materials Needed
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={this.change}
                    placeholder="Materials Needed"
                  />
                </label>
              </div>
            </div>
          </>
        }
      />
    );
  }
}

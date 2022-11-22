import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import config from "../config";

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
      const { id } = this.props.match.params;
      await axios(config.apiBaseUrl + "/courses/" + id)
        .then((response) => {
          if (response.data.course == null) {
            this.props.history.push("/notfound");
          } else if (
            response.data.course.user.emailAddress !=
            this.props.context.authenticatedUser.user.emailAddress
          ) {
            this.props.history.push("/forbidden");
          } else {
            this.setState({ course: response.data.course });
          }
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: { error: error.message },
          });
        });
    };

    course();
  }

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
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
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
                    defaultValue={title}
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
                    defaultValue={description}
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
                    defaultValue={estimatedTime}
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
                    defaultValue={materialsNeeded}
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

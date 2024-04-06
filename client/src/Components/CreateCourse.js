import React, { Component } from "react";
import Form from "./Form";

// Class component for creating a new course
export default class CreateCourse extends Component {
  // State variables for course creation
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };
  // Function to handle changes to state variables
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // Event handler for form submit events
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const {
      context: {
        authenticatedUser: {
          user: { id, password, emailAddress },
        },
      },
    } = this.props;
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: id,
      emailAddress,
    };
    // Create a new course in the database by calling createCourse method from context
    context.actions
      .createCourse(courseBody, emailAddress, password)
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
  // Redirectors to home page when cancel button is clicked
  cancel = () => {
    this.props.history.push("/");
  };

  // Render method for CreateCourse component
  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } =
      this.state;
    const {
      context: {
        authenticatedUser: { user },
      },
    } = this.props;
    // Renders Form Component With Information Relevant to Create Course
    return (
      <Form
        className={"wrap"}
        headerText={"Create Course"}
        submit={this.submit}
        submitButtonText="Create Course"
        cancel={this.cancel}
        errors={errors}
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
                <label htmlFor="courseDescription">
                  Course Description
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

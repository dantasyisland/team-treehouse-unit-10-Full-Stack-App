import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    // id: "", WILL NEED THIS SOMEWHERE
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    // userId: "", WILL NEED THIS SOMEWHERE
    errors: [],
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  submit = () => {};

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } =
      this.state;
    const {
      context: {
        authenticatedUser: { user },
      },
    } = this.props;
    console.log(user);
    return (
      <Form
        headerText={"Create Course"}
        submit={this.submit}
        submitButtonText="Sign Up!"
        cancel={this.cancel}
        errors={errors}
        elements={
          <>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={this.change}
              placeholder="Course Title"
            />
            <p>
              By{" "}
              <span>
                {user.firstName} {user.lastName}
              </span>
            </p>
            <textarea
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={this.change}
              placeholder="Course Description"
            />
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={this.change}
              placeholder="Estimated Time"
            />
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              value={materialsNeeded}
              onChange={this.change}
              placeholder="Materials Needed"
            />
          </>
        }
      />
    );
  }
}

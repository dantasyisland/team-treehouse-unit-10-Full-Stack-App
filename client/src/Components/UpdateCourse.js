import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";

export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    // has scope in constructor - global scope variables for class components?
    const { id } = this.props.match.params.id; // This eliminates useless constructor
    this.state = {
      isLoaded: false,
      course: {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
      },
      errors: [],
    };
  }

  componentDidMount() {
    /* ---------------------- Chance to use spread operator --------------------- */

    const course = async () => {
      const { id } = this.props.match.params;

      const course = await axios(config.apiBaseUrl + "/courses/" + id).then(
        (response) => {
          this.setState({ course: response.data.course });
        }
      );
      console.log(this.state.course);
    };

    course();
  }

  change = (event) => {
    console.log("%o", event);
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
    console.log(
      "%c --MUST SET STATE IN COURSE OBJECT---",
      "color:blue;font-size:1.2rem"
    );
    console.log(this.state);
  };

  submit = () => {
    const {
      context: {
        authenticatedUser: { user },
      },
    } = this.props;
    const { course } = this.state;
    console.log("submit clicked");
    this.props.context.actions.updateCourse(
      course,
      user.emailAddress,
      user.password
    );
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
        headerText={"Update Course"}
        submit={this.submit}
        submitButtonText={"Update Course"}
        cancel={this.cancel}
        errors={this.state.errors}
        elements={
          <>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={title}
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
              defaultValue={description}
              onChange={this.change}
              placeholder="Course Description"
            />
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue={estimatedTime}
              onChange={this.change}
              placeholder="Estimated Time"
            />
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              defaultValue={materialsNeeded}
              onChange={this.change}
              placeholder="Materials Needed"
            />
          </>
        }
      />
    );
  }
}

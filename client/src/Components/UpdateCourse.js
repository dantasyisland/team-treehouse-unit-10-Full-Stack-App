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
    };
  }

  componentDidMount() {
    const course = async () => {
      const { id } = this.props.match.params;
      await axios(config.apiBaseUrl + "/courses/" + id).then((response) => {
        console.log(response); // HERE
        console.log(this.props.context.authenticatedUser);
        this.setState({ course: response.data.course });
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
              </div>
              <div>
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
              </div>
            </div>
          </>
        }
      />
    );
  }
}

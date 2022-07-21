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
      course: {},
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
    };

    course();
  }

  submit = () => {
    console.log("submit clicked");
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

    return (
      <>
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
                value={this.state.course.title}
                onChange={this.change}
                placeholder="Course Title"
              />
            </>
          }
        />
      </>
    );
  }
}

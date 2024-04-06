import React from "react";

// Reusable form component that is rendered by CreateCourse, UpdateCourse, UserSignIn and UserSignUp components
export default function Form({
  headerText,
  submit,
  submitButtonText,
  cancel,
  errors,
  elements,
  className,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }
  // Render method for Form component
  return (
    <main>
      <div className={className}>
        <h2>{headerText}</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit} type="submit">
          {/* This is only for update and create course - part of elements? <div className="main--flex"></div> */}
          {elements}
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}

// Will display any  sequelization validation errors from API
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <>
        <div className="validation--errors">
          <h2>Error</h2>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return errorsDisplay;
}

import React from "react";

export default function Form({
  headerText,
  submit,
  submitButtonText,
  cancel,
  errors,
  elements,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <main>
      <div className="wrap">
        <h2>{headerText}</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit} type="submit">
          <div className="main--flex">{elements}</div>
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

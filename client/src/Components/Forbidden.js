// Component when redirected to forbidden url - will inform user that they do not have access to this course
export default function Forbidden({
  context: {
    authenticatedUser: { user },
  },
}) {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Uh oh! {user.emailAddress} you do not have access to this course.</p>
      </div>
    </main>
  );
}

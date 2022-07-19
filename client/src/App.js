// Components
import Courses from "./Components/Courses";
import Header from "./Components/Header";

// Styles
import "./styles/reset.css";
import "./styles/global.css";

// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseDetail from "./Components/CourseDetail";
import CreateCourse from "./Components/CreateCourse";
import UserSignIn from "./Components/UserSignIn";
import UserSignOut from "./Components/UserSignOut";
import UserSignUp from "./Components/UserSignUp";

import withContext from "./Components/Context/Context";

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);

const HeaderWithContext = withContext(Header);

function App() {
  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </Router>
  );
}

export default App;

// Components
import Courses from "./Components/Courses";

// // Styles
import "./styles/reset.css";
import "./styles/global.css";

// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseDetail from "./Components/CourseDetail";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignIn from "./Components/UserSignIn";
import UserSignOut from "./Components/UserSignOut";
import UserSignUp from "./Components/UserSignUp";
import Forbidden from "./Components/Forbidden";
import PrivateRoute from "./Components/PrivateRoute";
import { HeaderWithRouter } from "./Components/Header";

import withContext from "./Components/Context/Context";
import NotFound from "./Components/NotFound";

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const ForbiddenWithContext = withContext(Forbidden);

const HeaderWithContext = withContext(HeaderWithRouter);

function App() {
  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={ForbiddenWithContext} />
        <Route path="/notfound" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

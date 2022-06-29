// Components
import Courses from './Components/Courses';
import Header from './Components/Header';

// Styles
import './styles/reset.css';
import './styles/global.css';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={Public} /> Might have to do this if I need to recieve props */}
        <Route exact path="/">
          <Courses />
        </Route>
        <Route path="/courses/create">
          <CreateCourse />
        </Route>
        <Route exact path="/courses/:id">
          <CourseDetail />
        </Route>
        <Route path="/signin"></Route>
        <Route path="/signup"></Route>
        <Route path="/signout"></Route>
      </Switch>
    </Router>
  );
}

export default App;

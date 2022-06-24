// Components
import Courses from './Components/Courses';
import Header from './Components/Header';

// Styles
import './styles/reset.css';
import './styles/global.css';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseDetail from './Components/CourseDetail';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={Public} /> Might have to do this */}
        <Route exact path="/">
          <Courses />
        </Route>
        <Route exact path="/courses/:id">
          <CourseDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

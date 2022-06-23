import './App.css';
import { useState, useEffect } from 'react';

import axios from 'axios';
import URL from './config';

function App() {
  // JSON object
  const [courseData, setCourses] = useState([]);

  const getCourses = async () => {
    await axios.get(URL + '/courses').then((response) => {
      setCourses(response.data.courses);
    });
  };

  // Run Once
  useEffect(() => {
    getCourses();
  }, []);

  // Use effect dependent on state
  useEffect(() => {
    console.log(courseData);
    console.log(typeof courseData); // is an object
    console.log(Array.isArray(courseData));
  }, [courseData]);

  const courseList = courseData.map((course) => {
    return <li key={course.id}> {course.title} </li>;
  });

  return (
    <div className="App">
      <header className="App-header">
        <ul>{courseList}</ul>
      </header>
    </div>
  );
}

export default App;

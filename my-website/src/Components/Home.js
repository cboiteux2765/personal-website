import React from 'react';

const Home = () => {
  return (
    <div id="root">
      <p>
        Hi! My name is Clement Boiteux and I'm currently
        a first-year Computer Engineering student at the
        <a> University of California, Santa Barbara</a>!
        I'm primarily interested in machine learning and
        systems programming but also enjoy all things CS!
      </p>

      <p>Courses Taken</p>
      <ul>
        <li>MATH 4A - Linear Algebra</li>
        <li>CMPSC 16 - C++ Problem Solving</li>
        <li>ECE 5 - Intro to ECE (Arduino)</li>
        <li>ECE 15A - Logic Design</li>
        <li>WRIT 2E - Writing for Engineers 2</li>
      </ul>
      <br/>

      <p>Current Courses</p>
      <ul>
        <li>MATH 4B - Differential Equations</li>
        <li>CMPSC 24 - C++ Data Structures</li>
        <li>PHYS 7A - Physics: Mechanics</li>
        <li>WRIT 50E - Engineering Reports</li>
        <li>ECE 1A - Computer Engineering Seminar</li>
      </ul>
    </div>
  );
}

export default Home;
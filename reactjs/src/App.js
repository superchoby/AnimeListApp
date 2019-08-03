import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// import RouterComponent from './components/Router';
// import axios from 'axios';

// export default class App extends Component {

//   componentWillMount() {
//     axios.defaults.baseURL = 'http://192.168.87.59:8000/api';
//     axios.defaults.timeout = 1500;
//   }

//   render() {
//     return (
//       <RouterComponent />
//     );
//   }
// }


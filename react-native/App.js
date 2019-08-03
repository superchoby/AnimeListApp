import React, { Component } from 'react';
import RouterComponent from './src/Router';
import axios from 'axios';

export default class App extends Component {

  componentWillMount() {
    axios.defaults.baseURL = 'http://192.168.87.59:8000/api';
    axios.defaults.timeout = 1500;
  }

  render() {
    return (
      <RouterComponent />
    );
  }
}
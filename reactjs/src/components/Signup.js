import React, { Component } from 'react';
import axios from 'axios';

/**
 * @file Signup is a React Component that handles account creation
 * 
 * @extends React.Component
 */

class SignupPage extends Component {

  /**
    * @constructor
    * @param {props} props - the props for the class
    */
  constructor(props) {
    super(props)
    this.state = {
       username: '',
       password: '',
       email: '',
       redirect: false,
    }
    this.updateUsernameChange = this.updateUsernameChange.bind(this);
    this.updatePasswordChange = this.updatePasswordChange.bind(this);
    this.updateEmailChange = this.updateEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @method
   * @summary - onchange function that updates state as user types
   * their email
   */
  updateEmailChange = e =>{
    this.setState({
      email: e.target.value,
    })
  }
  /**
   * @method
   * @summary - onchange function that updates state as user types
   * their username
   */
  updateUsernameChange = e =>{
    this.setState({
      username: e.target.value,
    })
  }

  /**
   * @method
   * @summary - onchange function that updates state as user types
   * their password
   */
  updatePasswordChange = e =>{
    this.setState({
      password: e.target.value,
    })
  }

  /**
   * @method
   * @summary - sends the username and password to api endpoint and 
   * if signup info is valid, a token is returned.
   */
  handleSubmit = e =>{
    axios.post('http://127.0.0.1:8000/api/user/', this.state)
    .then(res =>{
      this.setState({
        redirect: true,
      })
    })
    .catch(error =>{
        console.log(error);
    })
    e.preventDefault();
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type='email' onChange={this.updateEmailChange} />
        </label>
        <label>
          Username:
          <input type='text' onChange={this.updateUsernameChange} />
        </label>
        <label>
          Password:
          <input type='password' onChange={this.updatePasswordChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default SignupPage;
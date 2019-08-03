import React, { Component } from 'react';
import axios from 'axios';

class SignupPage extends Component {

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

  updateEmailChange = e =>{
    //onchange function that updates state as user types
    //their email
    this.setState({
      email: e.target.value,
    })
  }

  updateUsernameChange = e =>{
    //onchange function that updates state as user types
    //their username
    this.setState({
      username: e.target.value,
    })
  }

  updatePasswordChange = e =>{
    //onchange function that updates state as user types
    //their password
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit = e =>{
    //sends the username and password to api endpoint and 
    //if login is successful, a token is returned.
    
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
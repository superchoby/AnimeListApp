import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css'
import { NavLink } from 'react-router-dom';

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
       signupSuccess: false,
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
    let newAccount = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }
    axios.post('http://127.0.0.1:8000/users/v1/user/', newAccount)
    .then(res =>{
      this.setState({
        signupSuccess: true,
      })
    })
    .catch(error =>{
        console.log(error);
    })
    e.preventDefault();
  }
  
  render() {

    let page;
    if(!this.state.signupSuccess){
      page = <form id='signup-form' onSubmit={this.handleSubmit}>

              <div id='email-input-signup' className='signup-input-divs'>
                <label>Email:</label>
                <input className='signup-input' type='email' onChange={this.updateEmailChange} />
              </div>

              <div id='username-input-signup' className='signup-input-divs'>
                <label>Username:</label>
                <input className='signup-input' type='text' onChange={this.updateUsernameChange} />
              </div>

              <div id='password-input-signup' className='signup-input-divs'>
                <label>Password:</label>
                <input className='signup-input' type='password' onChange={this.updatePasswordChange} />
              </div>

              <input id='signup-submit-button' type='submit' value='Submit' />
              <span style={{'textAlign': 'center'}}>Have an account already? <NavLink to='/'><p id='login-link1' className='login-link'>Login</p></NavLink></span>
            </form>
    }else{
      page = <span id='signup-success-message'>
                  Success! You may now 
                  <NavLink to='/'>
                    <p className='login-link'>
                      login here
                    </p>
                  </NavLink>
             </span>
    }

    return (
        <div id='login-whole-page-div'>
          {page}
        </div>
    );
  }
}

export default SignupPage;
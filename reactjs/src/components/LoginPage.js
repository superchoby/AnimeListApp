import React, { Component } from 'react';
import axios from 'axios';
import { storeToken, storeUsername } from '../actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';

/**
 * @file LoginPage is a React Component that handles user authentication
 * 
 * @extends React.Component
 */

/**
 * @method
 * @summary passes functions to update the token and username of the global
 * state
 * @param {function} dispatch - Triggers a change in the store
 * by dispatching an action
 * @return {object} - The functions to dispatch the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    storeToken: token => dispatch(storeToken(token)),
    storeUsername: username => dispatch(storeUsername(username),)
  }
}

class LoginPage extends Component {

   /**
    * @constructor
    * @param {props} props - the props for the class
    */
  constructor(props) {
    super(props)
    this.state = {
       username: '',
       password: '',
       redirect: false,
    }
    this.updateUsernameChange = this.updateUsernameChange.bind(this);
    this.updatePasswordChange = this.updatePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @method
   * @summary onchange function that updates state as user types
   * their username
   */
  updateUsernameChange = e =>{
    this.setState({
      username: e.target.value,
    })
  }

  /**
   * @method
   * @summary onchange function that updates state as user types
   * their password
   */
  updatePasswordChange = e =>{
    this.setState({
      password: e.target.value,
    })
  }

  /**
   * @method
   * @summary handles when the user submits their username and password.
   * Post request is sent with teh users info and the username and 
   * authentication token of the user is stored in the global state
   * 
   * @param {event} e - Paramater that is passed for functions that trigger from
   * events occuring
   */
  handleSubmit = e =>{
    //sends the username and password to api endpoint and 
    //if login is successful, a token is returned.
    axios.post('http://127.0.0.1:8000/api-token-auth/', this.state)
    .then(res =>{
      this.props.storeToken(res.data.token);
      this.props.storeUsername(this.state.username.toLowerCase())
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
    let redirectComponent = this.state.redirect ? <Redirect to='/view-list' /> : <p style={{display: 'none'}}></p>
    return (
      <div id='login-whole-page-div'>
        {redirectComponent}
        <form id='login-form' onSubmit={this.handleSubmit}>
          <div id='username-input-login' className='login-input-divs'>
            <label>Username:</label>
            <input className='login-input' type='text' onChange={this.updateUsernameChange} />
          </div>
          <div id='password-input-login' className='login-input-divs'>
            <label>Password:</label>
            <input className='login-input' type='password' onChange={this.updatePasswordChange} />
          </div>
          <input id='login-submit-button' type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

const Login = connect(null, mapDispatchToProps)(LoginPage)

export default Login;
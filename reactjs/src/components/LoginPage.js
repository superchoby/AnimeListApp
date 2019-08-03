import React, { Component } from 'react';
import axios from 'axios';
import { storeToken, storeUsername } from '../actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    storeToken: token => dispatch(storeToken(token)),
    storeUsername: username => dispatch(storeUsername(username),)
  }
}

class LoginPage extends Component {

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
    axios.post('http://127.0.0.1:8000/api-token-auth/', this.state)
    .then(res =>{
      console.log(res.data)
      this.props.storeToken(res.data.token);
      // this.props.storeUsername
      console.log(res.data.token)
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
      <React.Fragment>
        {redirectComponent}
        <form onSubmit={this.handleSubmit}>
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
      </React.Fragment>
    );
  }
}

const Login = connect(null, mapDispatchToProps)(LoginPage)

export default Login;
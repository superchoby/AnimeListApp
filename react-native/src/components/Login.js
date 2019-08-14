import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {storeToken, storeUsername } from '../actions/index'
function mapDispatchToProps(dispatch) {
  return {
    storeToken: token => dispatch(storeToken(token)),
    storeUsername: username => dispatch(storeUsername(username),)
  }
}

class Login extends Component {

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

  updateUsernameChange = text =>{
    this.setState({
      username: text,
    })
  }


  updatePasswordChange = text =>{
    this.setState({
      password: text,
    })
  }


  handleSubmit = () =>{
    axios.post('http://8d6808d3.ngrok.io/api-token-auth/', this.state)
    .then(res =>{
      this.props.storeToken(res.data.token);
      this.props.storeUsername(this.state.username)
      this.props.navigation.navigate('Home')
      this.setState({
        redirect: true,
      })
    })
    .catch(error =>{
        console.log(error);
    })
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
               placeholder="username"
               autoCorrect={false}
               autoCapitalize="none"
               onChangeText={this.updateUsernameChange}
               /* style={textInputStyle} */
             />
        <TextInput
               secureTextEntry
               autoCapitalize="none"
               autoCorrect={false}
               placeholder="password"
               onChangeText={this.updatePasswordChange}
               /* style={textInputStyle} */
             />
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

const LoginScreen = connect(null, mapDispatchToProps)(Login)

export default LoginScreen;

//  // src/components/common/LoginOrCreateForm.js

//  import React, { Component } from 'react';
//  import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
//  import { Actions } from 'react-native-router-flux';
//  import axios from 'axios';

//  class LoginOrCreateForm extends Component {
//   state = {
//     username: '',
//     password: '',
//     email: '',
//   }
 
//    handleRequest() {
//     const endpoint = this.props.create ? 'register' : 'login';
//     const payload = { username: this.state.username, password: this.state.password } 
    
//     if (this.props.create) {
//       // payload.first_name = this.state.firstName;
//       // payload.last_name = this.state.lastName;
//       payload.email = this.state.email;
//     }
    
//     axios
//       .post(`/auth/${endpoint}/`, payload)
//       .then(response => {
//         const { token, user } = response.data;
  
//         // We set the returned token as the default authorization header
//         axios.defaults.headers.common.Authorization = `Token ${token}`;
        
//         // Navigate to the home screen
//         Actions.main();
//       })
//       .catch(error => console.log(error));
//   }

//   renderButton() {
//     const buttonText = this.props.create ? 'Create' : 'Login';

//     return (
//       <Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
//     );
//   }

//    onUsernameChange(text) {
//      this.setState({ username: text });
//    }
 
//    onPasswordChange(text) {
//      this.setState({ password: text });
//    }

//   onEmailChange(text){
//     this.setState({ email: text });
//   }

//   renderCreateForm() {
//     const { fieldStyle, textInputStyle } = style;
//     if (this.props.create) {
//       return (
//           <View style={fieldStyle}>
//             <TextInput
//               placeholder="Email"
//               autoCorrect={false}
//               onChangeText={this.onEmailChange.bind(this)}
//               style={textInputStyle}
//             />
//           </View>
//       );
//     }
//   }
 
//    renderButton() {
//      const buttonText = this.props.create ? 'Create' : 'Login';
 
//      return (
//        <Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
//      );
//    }
 
 
//    renderCreateLink() {
//      if (!this.props.create) {
//        const { accountCreateTextStyle } = style;
//        return (
//          <Text style={accountCreateTextStyle}>
//            Or 
//            <Text style={{ color: 'blue' }} onPress={() => Actions.register()}>
//              {' Sign-up'}
//            </Text>
//          </Text>
//        );
//      }
//    }
 
//    render() {
//      const {
//        formContainerStyle,
//        fieldStyle,
//        textInputStyle,
//        buttonContainerStyle,
//        accountCreateContainerStyle
//      } = style;
 
//      return (
//        <View style={{ flex: 1, backgroundColor: 'white' }}>
//          <View style={formContainerStyle}>
//            <View style={fieldStyle}>
//              <TextInput
//                placeholder="username"
//                autoCorrect={false}
//                autoCapitalize="none"
//                onChangeText={this.onUsernameChange.bind(this)}
//                style={textInputStyle}
//              />
//            </View>
//            <View style={fieldStyle}>
//              <TextInput
//                secureTextEntry
//                autoCapitalize="none"
//                autoCorrect={false}
//                placeholder="password"
//                onChangeText={this.onPasswordChange.bind(this)}
//                style={textInputStyle}
//              />
//            </View>
//            {this.renderCreateForm()}
//          </View>
//          <View style={buttonContainerStyle}>
//            {this.renderButton()}
//            <View style={accountCreateContainerStyle}>
//              {this.renderCreateLink()}
//            </View>
//          </View>
//        </View>
//      );
//    }
//  }
 
 
//  const style = StyleSheet.create({
//    formContainerStyle: {
//      flex: 1,
//      flexDirection: 'column',
//      alignItems: 'center',
//      justifyContent: 'center',
//    },
//    textInputStyle: {
//      flex: 1,
//      padding: 15
//    },
//    fieldStyle: {
//      flexDirection: 'row',
//      justifyContent: 'center'
//    },
//    buttonContainerStyle: {
//      flex: 1,
//      justifyContent: 'center',
//      padding: 25
//    },
//    accountCreateTextStyle: {
//      color: 'black'
//    },
//    accountCreateContainerStyle: {
//      padding: 25,
//      alignItems: 'center'
//    }
//  });
 
 
//  export default LoginOrCreateForm;
 // src/components/common/LoginOrCreateForm.js

 import React, { Component } from 'react';
 import axios from 'axios';
 
 
 class LoginOrCreateForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  }
 
   handleRequest() {
    const endpoint = this.props.create ? 'register' : 'login';
    const payload = { username: this.state.username, password: this.state.password } 
    
    if (this.props.create) {
      payload.email = this.state.email;
    }
    
    axios
      .post(`/auth/${endpoint}/`, payload)
      .then(response => {
        const { token, user } = response.data;
  
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        
        // Navigate to the home screen
        // Actions.main();
        window.location = "/home"
      })
      .catch(error => console.log(error));
  }

  renderButton() {
    const buttonText = this.props.create ? 'Create' : 'Login';

    return (
      <button title={buttonText} onPress={this.handleRequest.bind(this)}/>
    );
  }

   onUsernameChange(text) {
     this.setState({ username: text });
   }
 
   onPasswordChange(text) {
     this.setState({ password: text });
   }

  onEmailChange(text){
    this.setState({ email: text });
  }
 


  renderCreateForm() {
    const { fieldStyle, textInputStyle } = style;
    if (this.props.create) {
      return (
          <form style={fieldStyle}>
            <input
              type="text"
              placeholder="Email"
              autoCorrect={false}
              onChangeText={this.onEmailChange.bind(this)}
              style={textInputStyle}
            />
          </form>
      );
    }
  }
//   <Text style={accountCreateTextStyle}>
//   Or 
//   <Text style={{ color: 'blue' }} onPress={() => Actions.register()}>
//     {' Sign-up'}
//   </Text>
// </Text>
 
   renderCreateLink() {
     if (!this.props.create) {
       const { accountCreateTextStyle } = style;
       return (
        //  <p style={accountCreateTextStyle}>
        //    Or 
        //    {/* <p style={{ color: 'blue' }} onPress={() => Actions.register()}>
        //      {' Sign-up'}
        //    </p> */}
        //  </p>
        <React.Fragment>
          <p>Login</p>
          <p>Signup</p>
        </React.Fragment>
       );
     }
   }
 
   render() {
     const {
       formContainerStyle,
       fieldStyle,
       textInputStyle,
       buttonContainerStyle,
       accountCreateContainerStyle
     } = style;
 
     return (
       <div style={{ flex: 1, backgroundColor: 'white' }}>
         <div style={formContainerStyle}>
           <div style={fieldStyle}>
             <input
               type="text"
               placeholder="username"
               autoCorrect={false}
               autoCapitalize="none"
               onChangeText={this.onUsernameChange.bind(this)}
               style={textInputStyle}
             />
           </div>
           <div style={fieldStyle}>
             <input
               type="text"
               secureTextEntry
               autoCapitalize="none"
               autoCorrect={false}
               placeholder="password"
               onChangeText={this.onPasswordChange.bind(this)}
               style={textInputStyle}
             />
           </div>
           {this.renderCreateForm()}
         </div>
         <div style={buttonContainerStyle}>
           {this.renderButton()}
           <div style={accountCreateContainerStyle}>
             {this.renderCreateLink()}
           </div>
         </div>
       </div>
     );
   }
 }
 
 
 const style = {
   formContainerStyle: {
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
   },
   textInputStyle: {
     flex: 1,
     padding: 15
   },
   fieldStyle: {
     flexDirection: 'row',
     justifyContent: 'center'
   },
   buttonContainerStyle: {
     flex: 1,
     justifyContent: 'center',
     padding: 25
   },
   accountCreateTextStyle: {
     color: 'black'
   },
   accountCreateContainerStyle: {
     padding: 25,
     alignItems: 'center'
   }
 };
 
 
 export default LoginOrCreateForm;
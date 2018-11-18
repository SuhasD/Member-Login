
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  KeyboardAvoidingView,
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity, 
  StyleSheet,
  Dimensions
} from "react-native"; 


export default class Login extends Component {

   componentWillMount() {
   const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-ID');
    const email = navigation.getParam('email', 'some default value');
    const pwd = navigation.getParam('pwd', 'some default value');

    this.setState({
      name: name,
      email:email,
      pwd:pwd
    })
  }


  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      pwd:'',
      name:'',
      emailValid: false,
      pwdValid:false,
      nameValid:false
    };
    this.checkRegister = this.checkRegister.bind(this);
    this.register = this.register.bind(this);
  }


  render() {
    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('./assets/logo.png')} />
                    <Text style={styles.company}>myCrew</Text>
                    <Text style={styles.tag}>Find your running buddies!</Text>
         </View>

            <View style={styles.formContainer}>
                  <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Enter Email' 
               placeholderTextColor='#000'
               onChangeText={(text) => this.validateEmail(text)}
               defaultValue= {this.state.email}
               />

            <TextInput style = {styles.input}   
              returnKeyType="next" 
              placeholder='Enter password' 
              placeholderTextColor='#000'
              secureTextEntry
              defaultValue={this.state.pwd}
              onChangeText={(pwd) => this.validatePwd(pwd)}/>


          <TouchableOpacity disabled={!this.checkFlags()}
          style={this.checkFlags() ? styles.formEnable : styles.formDisable}
            onPress={ () => this.checkRegister() }>
                       <Text  style={styles.buttonText}>LOGIN</Text>
                       
          </TouchableOpacity>

<Button  title="New to myCrew? Register" onPress={this.register} />
            </View>
       </KeyboardAvoidingView>
    );
  }

    checkRegister(evt) {
     this.props.navigation.navigate('Details',{
          name:this.state.name,
          pwd:this.state.pwd,
          email:this.state.email
        })
  }

  register(evt) {
     this.props.navigation.navigate('Home',{
          name:this.state.name,
          pwd:this.state.pwd,
          email:this.state.email
        })
  }

  checkFlags(){
        if(this.state.email && this.state.pwd && this.state.name){
        return true;
      } else {
        return false;
      }
  }

  validatePwd = (pwd) => {
    if(pwd.length > 5){
      this.setState({pwdValid:true});
      this.setState({pwd:pwd});
     // alert('Pwd valid');
    }
  }  

  validateName = (name) => {
    var letters = /^[A-Za-z]+$/;
    if(name.match(letters)){
     // alert('Name valid');
      this.setState({name:name})
      this.setState({nameValid:true})
    }
  }


  validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({email:text})
    return false;
      }
    else {
      this.setState({email:text})
      this.setState({emailValid:true})
      //alert("Email is Correct");
    }
   }
}

const styles = StyleSheet.create({
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },

    company:{
      marginTop:180,
      fontWeight: '700',
      fontSize:22
    },

    tag:{
      fontSize:18,
      marginTop:5
    },

   container: {
     padding: 20,
     flex: 1,
      bottom:40,
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    input:{
        height: 40,
        backgroundColor: 'white',
        borderColor:'black',
        borderWidth:1,
        width:250,
        borderRadius:10,
        marginBottom: 8,
        padding: 10,
        color: '#000' 
    },
    buttonContainer:{
        backgroundColor: '#f31377',
        paddingVertical: 15,
         borderRadius:10,
    },

    formDisable:{
        backgroundColor: '#f31377',
        paddingVertical: 15,
         borderRadius:10,
         opacity:0.5
    },
formEnable:{
        backgroundColor: '#f31377',
        paddingVertical: 15,
         borderRadius:10,
         opacity:1
    },

    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});








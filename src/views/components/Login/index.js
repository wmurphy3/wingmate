import React, { Component }               from 'react';
import { AppRegistry, Text, Image, View,
         KeyboardAvoidingView }           from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import { Button, Card, Divider, Icon }    from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'
import { SecureStore, Fingerprint }       from 'expo'
import FingerprintWaitingNotification     from '*/views/components/atoms/FingerprintWaitingNotification'
import { displayError }                   from '*/utils/toastr'
import colors                             from '*/views/components/atoms/Colors'

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: null,
      show: false,
      authorized: true,
      turn_touch_id_on: false
    }
  }

  componentWillMount() {
    const { user } = this.props
    SecureStore.deleteItemAsync('email')
    SecureStore.deleteItemAsync('password')
    // Get email if set
    this._handleTouchPermissions()

    if(!user.login_username) {
      this.setEmail()
    }
  }

  setEmail() {
    SecureStore.getItemAsync('email')
    .then((data) => {
      this.setState({
        email: data,
        show: (data ? true : false)
      })
      this.props.getLoginInfo(data)
    }).catch((error) => {

    })
  }

  onLogin = (values) => {
    this.props.onLogin(values, this.state.turn_touch_id_on)
  }

  gotToForgotPassword() {
    NavigatorService.navigate('ForgotPassword')
  }

  goToRegister() {
    NavigatorService.navigate('Register')
  }

  goToContactUs() {
    NavigatorService.navigate('ContactUs')
  }

  handleTouchID = () => {
    const { user } = this.props
    const { email, authorized } = this.state

    if((email || user.login_username) && authorized) {
      this.setState({
        show: true
      })
    } else {
      let turn_touch_id_on = !this.state.turn_touch_id_on
      this.setState({
        turn_touch_id_on: turn_touch_id_on
      })
    }
  }

  handleLogin = () => {
    const email = this.state.email || this.props.user.login_username

    SecureStore.getItemAsync('password')
    .then((data) => {
      this.props.onLogin({username: email, password: data})
    }).catch((error) => {
      displayError('Could not login. Try entering your email and password.')
    })
  }

  _handleTouchPermissions = () => {
    Fingerprint.isEnrolledAsync()
    .then(result => {
      this.setState({authorized: result})
    })
  }

  touchView() {
    const { handleSubmit, user } = this.props

    if(this.state.authorized) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '80%'}}>
            <Button
              title="Login"
              onPress={handleSubmit(this.onLogin)}
              containerViewStyle={{marginLeft: 0, marginRight: 0}}
              buttonStyle={style.button} />
          </View>
          <View style={{marginLeft: 10}}>
            <Icon
              name='ios-finger-print'
              type='ionicon'
              size={53}
              color={this.state.turn_touch_id_on ? colors.main : colors.border}
              containerStyle={{marginTop: 5, alignSelf: 'flex-end'}}
              onPress={() => this.handleTouchID()} />
          </View>
        </View>
      )
    } else {
      return (
        <Button
          title="Login"
          onPress={handleSubmit(this.onLogin)}
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          buttonStyle={style.button} />
      )
    }
  }

  render() {
    const { handleSubmit, user } = this.props

    return (
      <View style={style.mainBackground}>
        <Card
          containerStyle={style.container}
          image={require('*/views/assets/logo.png')}
          imageWrapperStyle={{paddingHorizontal: 20}}
          imageStyle={{'maxHeight': 100}}
          imageProps={{resizeMode: "contain"}} >

          <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={-30}
          >
            <Field
              name="username"
              type="text"
              autoCapitalize={'none'}
              placeholder="Email"
              component={FieldInput} />

            <Field
              name="password"
              secureTextEntry={true}
              placeholder="Password"
              component={FieldInput} />

            <Text onPress={() => this.gotToForgotPassword()} style={style.forgot_password_link}>Forgot Password?</Text>

            {this.state.show &&
              <FingerprintWaitingNotification
                onFingerprintSuccess={this.handleLogin}
              />
            }

          </KeyboardAvoidingView>

          { this.touchView() }

          <Text style={style.link}>
            Don't have an account? <Text onPress={() => this.goToRegister()} style={style.register_link}>Register</Text></Text>
            <Divider style={style.divider} />
            <Text onPress={() => this.goToContactUs()} style={style.contact_link}>Contact Us
          </Text>
        </Card>
      </View>
    );
  }
}

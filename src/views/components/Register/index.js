import React, { Component }               from 'react';
import { Text, Image, ScrollView }        from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Button, Card, Divider }          from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'

export default class Register extends Component {

  onRegister = (values) => {
    this.props.register(values)
  }

  goToLogin() {
    NavigatorService.navigate('Login')
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <KeyboardAwareScrollView style={style.mainBackground}>
        <Card
          containerStyle={style.container}
          image={require('*/views/assets/logo.png')}
          imageWrapperStyle={{paddingHorizontal: 20}}
          imageStyle={{'maxHeight': 100}}
          imageProps={{resizeMode: "contain"}} >

            <Field
              name="email"
              type="text"
              placeholder="Email"
              component={FieldInput} />

            <Field
              name="name"
              type="text"
              placeholder="First and Last Name"
              component={FieldInput} />

            <Field
              name="phone"
              type="text"
              placeholder="Phone Number"
              component={FieldInput} />

            <Field
              name="zip"
              type="text"
              placeholder="Property Zip Code"
              component={FieldInput} />

            <Field
              name="loan_number"
              type="text"
              placeholder="Loan Number"
              component={FieldInput} />

            <Field
              name="ssn"
              type="text"
              placeholder="Last 4 of SSN"
              component={FieldInput} />

            <Field
              name="password"
              secureTextEntry={true}
              placeholder="Password"
              component={FieldInput} />

            <Field
              name="password_confirmation"
              secureTextEntry={true}
              placeholder="Re-enter Password"
              component={FieldInput} />

          <Button
            title="Register"
            onPress={handleSubmit(this.onRegister)}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={style.button} />

          <Text style={style.link}>Already have an account? <Text onPress={() => this.goToLogin()} style={style.login_link}>Login</Text></Text>

        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

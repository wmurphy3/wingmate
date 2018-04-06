import React, { Component }               from 'react';
import { AppRegistry, Text, Image, View } from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Button, Card }                   from 'react-native-elements'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'

export default class ForgotPassword extends Component {

  onForgotPassword = (values) => {
    this.props.sendRecoveryEmail(values)
  }

  gotToLogin() {
    NavigatorService.navigate('Login')
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <View style={style.mainBackground}>
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

          <Button
            title="Send Email"
            onPress={handleSubmit(this.onForgotPassword)}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={style.button} />

          <Text onPress={() => this.gotToLogin()} style={style.login_link}>Login</Text>
        </Card>
      </View>
    );
  }
}

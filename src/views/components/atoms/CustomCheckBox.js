import React, {Component}           from 'react'
import { View }                     from 'react-native'
import { FormLabel, CheckBox,
         FormValidationMessage}     from 'react-native-elements'
import colors                       from '*/views/components/atoms/Colors'


export default class CustomCheckBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: (props.input.value ? true : false)
    }

    this._onChange = this._onChange.bind(this)
  }

  _onChange = () => {
    var value = !this.state.value
    this.setState({
      value: value
    })
    this.props.input.onChange(value)
  }

  render() {
    const { input, secureTextEntry, label, required, placeholder,children, disabled,
      style, inner_style, size, className, meta: { touched, visited, error, warning } } = this.props

    const checkbox_size = size || 24

    return (
      <View style={style}>
        <CheckBox
          left
          title={label}
          size={checkbox_size}
          checkedColor="#86938e"
          uncheckedColor="#86938e"
          textStyle={{color: "#86938e"}}
          containerStyle={{backgroundColor: "#fff", borderWidth: 0}, inner_style}
          checked={this.state.value}
          onPress={() => this._onChange()}
        />
        {touched &&
          ((error && <FormValidationMessage>{error}</FormValidationMessage>))}
      </View>
    )
  }
}

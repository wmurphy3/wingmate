import React, {Component}         from 'react'
import { Field }                  from 'redux-form'
import { View, Text }             from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}   from 'react-native-elements'
import { TextInputMask }          from 'react-native-masked-text'
import colors                     from '*/views/components/atoms/Colors'

export default class AmountInput extends Component {

  constructor(props) {
   super(props);

   this.state = {
     amount: this.props.input.value ? this.convertAmount() : 0.00
   }
   this._onChange = this._onChange.bind(this);
  }

  convertAmount() {
    return ((this.props.input.value || 0) / 100).toFixed(2)
  }

  _onChange(text) {
  	let total = parseInt(text.replace(/\D/g,''), 10)

    this.props.input.onChange(total)

    this.setState({
      amount: (total / 100)
    })
  }

  render() {
    const { input, type, disabled, validate, required, placeholder, description,
            label, className, children, meta: { touched, error, warning } } = this.props

    return(
      <View>
        <FormLabel>
          {required && <abbr title="required">*</abbr> }
          {label}
        </FormLabel>
        <TextInputMask
        	type={'money'}
          options={{delimiter: ',', separator: '.', unit: '$'}}
        	customTextInput={FormInput}
          editable={!disabled}
          returnKeyType='done'
          inputStyle={{color: (disabled ? '#d4d8db' : '#86939e')}}
          onChangeText={this._onChange}
          value={this.state.amount}
        	placeholder={placeholder}
        />
        {description && <Text style={{color: "#707E8A",fontSize: 13,marginLeft:20}}>{description}</Text>}
        {touched &&
          ((error && <FormValidationMessage>{error}</FormValidationMessage>))}
      </View>
    )
  }
}

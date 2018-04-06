import React, { Component }               from 'react'
import { View, StyleSheet, Dimensions }   from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}           from 'react-native-elements'
import SelectInput                        from 'react-native-select-input-ios'
import colors                             from '*/views/components/atoms/Colors'

export default class FieldSelect extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: String(props.input.value) || null,
      // TODO: Figure out color for placeholder
      color: props.placeholder ? '#C7C7CD' : '#86939e'
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  setupOptions() {
    const { options, placeholder } = this.props
    if(options[0]["label"] != (placeholder ? placeholder : "")) {
      options.unshift({value: null, label: (placeholder ? placeholder : "")})
    }

    return options
  }

  onSubmit(value) {
    this.setState({
      value: value,
      color: '#86939e'
    })
    this.props.input.onChange(value)
  }

  render() {
    const { label, required, options, placeholder, style, meta: { touched, visited, error, warning } } = this.props

    return (
      <View style={style}>
        <FormLabel labelStyle={{marginLeft: 0, marginRight: 0}}>
          {required && <abbr title="required">*</abbr> }
          {label}
        </FormLabel>
        <SelectInput
          value={this.state.value}
          options={this.setupOptions()}
          onCancelEditing={() => console.log('onCancel')}
          onSubmitEditing={this.onSubmit}
          labelStyle={{color: this.state.color, fontSize: 16, marginTop: 7}}
          style={[styles.selectInput, styles.selectInputLarge]}
        />
        {touched &&
          ((error && <FormValidationMessage labelStyle={{marginLeft: 0, marginRight: 0}}>{error}</FormValidationMessage>))}
      </View>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  selectInput: {
    minHeight:        36,
    backgroundColor:  '#FFFFFF',
    flexDirection:    'row',
    borderBottomWidth: 1,
    borderBottomColor: "#bdc6cf"
  },
  selectInputLarge: {
    width: SCREEN_WIDTH - 40
  }
});

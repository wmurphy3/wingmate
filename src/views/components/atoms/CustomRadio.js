import React, { Component }               from 'react'
import { View, SegmentedControlIOS }      from 'react-native'
import { FormLabel,
         FormValidationMessage}           from 'react-native-elements'
import colors                             from '*/views/components/atoms/Colors'

export default class CustomRadio extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: (props.input.value == props.options[1] ? 1 : 0)
    }

    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(value) {
    this.setState({
      value: (value == this.props.options[1] ? 1 : 0)
    })
    this.props.input.onChange(value)
  }

  render() {
    const { label, required, options, style, meta: { touched, visited, error, warning } } = this.props

    return (
      <View style={style}>
        <FormLabel labelStyle={{marginLeft: 0, marginRight: 0}}>
          {required && <abbr title="required">*</abbr> }
          {label}
        </FormLabel>
        <SegmentedControlIOS
          values={options}
          selectedIndex={this.state.value}
          tintColor={colors.main}
          onValueChange={this.onSubmit}
        />
        {touched &&
          ((error && <FormValidationMessage labelStyle={{marginLeft: 0, marginRight: 0}}>{error}</FormValidationMessage>))}
      </View>
    );
  }
}

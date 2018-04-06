import React, { Component }           from 'react'
import { View, Text }                 from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}       from 'react-native-elements'
import moment                         from 'moment'
import { Calendar }                   from 'react-native-calendars'
import {formatAmount }                from '*/utils/custom_services'

export default class CustomCalendar extends Component {
  constructor(props, context) {
    super(props, context);

    const number_months = props.month_span
    var min_date = number_months > 0 ? moment().format('YYYY-MM-DD') : null
    var max_date = number_months > 0 ? moment().add(number_months, 'M').format('YYYY-MM-DD') : null

    this.state = {
      picked_day: props.input.value ||null,
      visible: false,
      min_date: min_date,
      max_date: max_date,
      touched: false
    }

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

  _onChangeDate(date) {
    this.setState({
      picked_day: date.dateString,
      visible: false
    })
    this.props.input.onChange(moment(date.dateString).format('YYYY-MM-DD'))
  }

  _onFocus() {
    this.setState({
      visible: true,
      touched: true
    })
  }

  isDisabled(date) {
    let day = date.dateString
    const disabled_days = this.props.disabled_days || []

    if(disabled_days.includes(moment(day).format('YYYY-MM-DD')) ||
       this.state.min_date > moment(day).format('YYYY-MM-DD') ||
       this.state.max_date < moment(day).format('YYYY-MM-DD') ) {
      return true
    }
  }

  disabledDates() {
    const disabled_days = this.props.disabled_days || []
    let disabled_dates = {}

    for (var i in disabled_days) {
      disabled_dates[`${disabled_days[i]}`] = {disabled: true, disableTouchEvent: true}
    }

    return disabled_dates
  }

  render() {
    const id = this.props.name || "input"
    const size = this.props.size || 56
    const due_date = this.props.due_date || moment().startOf('month')
    const {input, placeholder, name, children, style, meta: {error}, details, required, label } = this.props
    const dates = this.props.dates

    return(
      <View style={style}>
        <FormLabel labelStyle={{marginLeft: 0, marginRight: 0}}>
          {required && <abbr title="required">*</abbr> }
          {label}
        </FormLabel>
        <FormInput
          {...input}
          value={this.state.picked_day}
          id={input.name}
          name={name}
          onFocus={this._onFocus}
          containerStyle={{marginLeft: 0, marginRight: 0}}
          inputStyle={{color: "#86938e"}}
          placeholder={placeholder}>
            {children}
        </FormInput>
        { this.state.visible ?
          <View style={{marginTop: 50}}>
            <Calendar
              style={{
                borderWidth: 1,
                borderColor: "#86938e",
                height: 350
              }}
              minDate={this.state.min_date}
              maxDate={this.state.max_date}
              onDayPress={this._onChangeDate}
              markedDates={this.disabledDates()}
            />
          </View> : <View></View>
        }
        {this.state.touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    )
  }
}

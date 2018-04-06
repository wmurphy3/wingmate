import React, { Component } from 'react'
import DatePicker           from 'react-native-datepicker'
import { View }             from 'react-native'
import moment               from 'moment'
import calendarImage        from '*/views/assets/calendar.png'

export default class VtxDatePicker extends Component {

  static defaultProps = {
    placeholder: '',
    minDate: moment(),
    maxDate: moment().add(30, 'days')
  }

  handleChange = (date) => {
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
  }

  render() {
    const { input, placeholder, meta: {touched, error}, className } = this.props
    const height = 60
    let style = {
      height: height,
      width: '100%'
    }

    return (

      <DatePicker
        {...input}
        onDateChange={this.props.onDateChange}
        style={style}
        iconSource={calendarImage}
        mode='date'
        placeholder='Select Date'
        format="YYYY-MM-DD"
        confirmBtnText='Done'
        cancelBtnText='Cancel'
      />
    );
  }

}

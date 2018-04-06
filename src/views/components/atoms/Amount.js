import React, { Component }  from 'react'
import { Text, View }                   from 'react-native'
import { Row }                          from 'react-native-easy-grid'
import numeral                          from 'numeral'
import _                                from 'lodash'


export default class Amount extends Component {
  render() {
    const size = this.props.size || 40
    const precision = typeof this.props.precision !== 'undefined' ? this.props.precision : 2
    const styles = _.merge({
      container: {
        ...this.props.container_style,
        flexDirection: 'row'
      },
      symbol: {
        color: '#242626',
        fontSize: size*.5,
        alignSelf: 'baseline',
        marginRight: 5
      },
      round: {
        ...this.props.amount_style,
        color: '#292929',
        fontSize: size,
      },
      cents: {
        color: '#292929'
      },
    }, this.props.style || {})
    const symbol = this.props.symbol || '$'
    const value = Number(this.props.amount / 100).toFixed(2)  // this is because the API works with integers instead of float. (API value 12345 == float 123.45)
    var integer = parseInt(value)
    let decimal_node = (
      <Text></Text>
    )
    if (precision > 0) {
      let decimal = numeral(value % 1 * Math.pow(10, precision)).format('0'.repeat(precision))
      decimal_node = (
        <Text style={styles.cents}>.{decimal}</Text>
      )
    } else if(precision == 0){
      integer = Number(this.props.amount)
    }
    return (
      <View style={styles.container}>
        <Text style={styles.round}>
          <Text style={styles.symbol}>{symbol}&nbsp;</Text>
          {integer.toLocaleString()}
          { decimal_node }
        </Text>
      </View>
    )
  }
}

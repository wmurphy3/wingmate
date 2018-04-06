import React, { Component }  from 'react'
import { AppRegistry, Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid }    from 'react-native-easy-grid';
import { Circle }            from 'react-native-progress'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import Amount                from '*/views/components/atoms/Amount'
import { Button }            from 'react-native-elements'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'
import { Permissions, Notifications }           from 'expo'

export default class DashboardScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: ((state.params && state.params.loanid) ? `Loan #${state.params.loanid}` : 'Welcome!'),
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pay_amount_percent: 0,
      pay_month_percent: 0,
    }
  }

  componentWillMount() {
    const {navigation, user} = this.props

    if(user) {
      navigation.setParams({loanid: user.account_number});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps

    this.setState({
      pay_amount_percent: account.principal / account.original_amount || 0,
      pay_month_percent: account.terms_paid / account.original_term || 0
    });
  }

  render() {
    const { account, user } = this.props

    if (account.loading || account.total_amount_due === undefined)
      return (<Spinner />)

    return (
      <ScrollView style={style.mainBackground}>
        <View style={[style.centered, style.margin, style.border_bottom]}>

          <Text style={style.due_title}>Amount Due</Text>
          <Amount amount={account.total_amount_due} size={45} />

          <Button
            transparent={true}
            color={colors.main}
            title="Make Payment"
            onPress={() => this.goToPayment()}
            containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 10}} />
        </View>

        <View style={[style.centered, style.margin, style.border_bottom]}>
          <Text style={style.container_progress_title}>LOAN PROGRESS</Text>
          <View style={style.circles}>
            <View style={style.row_centered}>
              <Circle
                textStyle={style.container_progress_title}
                thickness={6}
                color={"#3ec556"}
                unfilledColor={"#e3e9ef"}
                borderColor={"#ffffff"}
                size={90}
                showsText
                progress={this.state.pay_amount_percent}
                formatText={() => this._handlePercents(this.state.pay_amount_percent)} />

              <Amount amount={account.principal} size={18} />
              <Text style={style.details}>Principal Paid to Date</Text>
              <Amount amount={account.original_amount} size={18} style={{container:style.separate_top}} />
              <Text style={style.details}>Original Loan Amount</Text>
            </View>
            <View style={style.row_centered}>
              <Circle
                textStyle={style.container_progress_title}
                thickness={6} color={"#ffad00"}
                unfilledColor={"#e3e9ef"}
                borderColor={"#ffffff"}
                size={90}
                showsText
                progress={this.state.pay_month_percent}
                formatText={() => this._handlePercents(this.state.pay_month_percent)} />

              <Text style={style.amount}>{account.original_term / 12} Years</Text>
              <Text style={style.details}>Original Loan Term</Text>
              <Text style={[style.separate_top, style.amount]}>{account.terms_paid} of {account.original_term} Payments</Text>
              <Text style={style.details}>Original Loan Amount</Text>
            </View>
          </View>
        </View>

        <View style={[style.border_bottom]}>
          <View style={[style.centered, style.row]}>
            <View style={[style.row_centered, style.border_right]}>
              <Text style={style.container_progress_title}>Interest Rate</Text>
              <Text style={style.size_18}>{account.interest_rate}%</Text>
            </View>
            <View style={style.row_centered}>
              <Text style={style.container_progress_title}>Current Balance</Text>
              <Amount amount={account.current_balance} size={18} container_style={{marginBottom: 5}} />
            </View>
          </View>
        </View>
        <View style={[style.border_bottom]}>
          <View style={[style.centered, style.row]}>
            <View style={[style.row_centered, style.border_right]}>
              <Text style={style.container_progress_title}>Escrow Balance</Text>
              <Amount amount={account.escrow} size={18} container_style={{marginBottom: 5}} />
            </View>
            <View style={style.row_centered}>
              <Text style={style.container_progress_title}>Last Payment</Text>
              <Text style={style.size_18}>{moment(account.last_payment_at).format('MM/DD/YY')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

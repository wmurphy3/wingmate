import React                  from 'react'
import { Text, Animated,
  Easing, Image }             from 'react-native'
import { StackNavigator,
         DrawerView,
         DrawerNavigator }    from 'react-navigation'

import Login                  from '*/views/containers/Login'
import ForgotPassword         from '*/views/containers/ForgotPassword'
import Register               from '*/views/containers/Register'
import Dashboard              from '*/views/containers/Dashboard'

import Menu                   from '*/views/components/atoms/Menu'
import colors                 from '*/views/components/atoms/Colors'
import { Icon }               from 'react-native-elements'
import style                  from './style'
import NavigatorService       from '*/utils/navigator'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const LoginStack = StackNavigator({
  Login:          { screen: Login },
  ForgotPassword: { screen: ForgotPassword },
  Register:       { screen: Register },
}, {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: null,
      title: null,
      headerTintColor: null
    }
})

const drawerButton = (navigation) =>
  <Icon
    onPress={() => {
        // Coming soon: navigation.navigate('DrawerToggle')
        // https://github.com/react-community/react-navigation/pull/2492
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }
    }
    color='#fff'
    name='menu'
    size={35} />

const DrawerStack = DrawerNavigator({
  Dashboard:  { screen: Dashboard },
  Login:      { screen: Login },
}, {
  gesturesEnabled: false,
  contentComponent: Menu
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    ...header,
  })
})

// Children stacks
const goBackButton = (url) =>
  <Icon
    name={'chevron-left'}
    color="#fff"
    onPress={ () => NavigatorService.navigate(url) }  />

// Master stack
export default StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
}, {
  // Default config for all screens
  headerMode: 'none',
  title: null,
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})

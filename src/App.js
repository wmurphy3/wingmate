import React, { Component } 		from 'react'
import { addNavigationHelpers } from 'react-navigation'
import AppNavigator 						from './AppNavigator'
import NavigatorService         from '*/utils/navigator'
import { displaySuccess }       from '*/utils/toastr'
import { Notifications }        from 'expo'

export default class AppWithNavigationState extends Component {
  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    displaySuccess(notification.data)
  };

  render() {
    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
      />
    );
  }
}

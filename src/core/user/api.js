import fetch                                            from 'cross-fetch'
import { Platform }                                     from 'react-native'
import { REACT_APP_API_URL, REACT_APP_AUTH_URL }        from 'react-native-dotenv'
import {getResponseData, getRegisterFormData,
        buildBody, getPasswordFormData}                 from '*/core/api/helpers'

const ENDPOINT = `${REACT_APP_API_URL}/users`;
const AUTH_ENDPOINT = `${REACT_APP_AUTH_URL}/oauth/token`

export default {

  login: (user) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        email: user.username,
        password: user.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  register: (user) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('user', user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  }

}

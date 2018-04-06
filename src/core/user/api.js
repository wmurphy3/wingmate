import fetch                                            from 'cross-fetch'
import { Platform }                                     from 'react-native'
import { REACT_APP_API_URL, REACT_APP_AUTH_URL,
         REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from 'react-native-dotenv'
import {getResponseData, getRegisterFormData,
        buildBody, getPasswordFormData}                 from '*/core/api/helpers'

const ENDPOINT = `${REACT_APP_API_URL}/users`;
const AUTH_ENDPOINT = `${REACT_APP_AUTH_URL}/oauth/token`
const CLIENT_ID = REACT_APP_CLIENT_ID
const PUSH_ENDPOINT = `${REACT_APP_AUTH_URL}/api/devices`
const CLIENT_SECRET = REACT_APP_CLIENT_SECRET

export default {

  login: (user) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        client_id: CLIENT_ID,
        username: user.username,
        password: user.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  register: (user, token) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('user', user),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  updatePassword: (passwords, token) => {
    return fetch(`${ENDPOINT}/update_password`, {
      method: 'PATCH',
      body: buildBody("user", passwords),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  refreshToken: ({refresh_token}) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  userUpdate: (token, user, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: buildBody("user", user),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  removeToken: (token) => {
    return fetch(`${ENDPOINT}remove_token`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token || undefined}`
      }
    }).then((resp) => {
      return {"done": true}
    })
  },

  saveToken: (access_token, token) => {
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      body: buildBody('mobile_token', {'token': access_token, 'platform': Platform.OS}),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then((resp) => {
      return {"done": true}
    })
  },

  getToken: () => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify( {
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  sendRecoveryEmail: (email, token) => {
    return fetch(`${ENDPOINT}/send_recovery_email`, {
      method: 'POST',
      body: JSON.stringify( {
        email: email.email
      }),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  }

}

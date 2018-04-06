import { all, takeLatest, fork, call, put,
         select, race, take }                       from 'redux-saga/effects'
import { delay }                                    from 'redux-saga'
import { AsyncStorage }                             from 'react-native'
import { unsetUser, setUser, receiveLoginError,
         updateUserError, updateUserSuccess,
         registerError, sendRecoveryEmailError,
         updatePasswordError }                       from './actions'
import { LOGIN_REQUESTED, USER_UNSET, USER_UPDATED,
         REGISTERED, SEND_RECOVERY_EMAIL,
         UPDATE_PASSWORD, SAVE_TOKEN }               from './constants'
import apiUser                                       from './api'
import { displayErrors }                             from '*/utils/custom_services'
import { getAccessToken }                            from '*/core/user'
import { SecureStore }                               from 'expo'
import NavigatorService                              from '*/utils/navigator'
import { displaySuccess, displayError }              from '*/utils/toastr'

// Side effects Services
const getAuthToken = () => {
  try {
    const value = AsyncStorage.getItem('token')
    if (value !== null){
      return(JSON.parse(value))
    }
  } catch (error) {
    return null
  }
}

const setAuthToken = (token) => {
  AsyncStorage.setItem('token', JSON.stringify(token))
}

const removeAuthToken = () => {
  AsyncStorage.removeItem('token')
}

const setCache = (key, value) => {
  SecureStore.setItemAsync(key, value);
}

function* logout () {
  yield call(removeAuthToken)
  yield put(unsetUser())
}

function* refresh(credentialsOrToken) {

  const { response } = yield race({
    response: call(apiUser.refreshToken, credentialsOrToken),
    signout : take(USER_UNSET)
  })

  if (response && response.access_token) {
    yield call(setAuthToken, response)
    yield put(setUser(response))
    return response
  } else {
    yield call(logout)
    return null
  }
}

function* authorize(credentialsOrToken, turn_touch_id_on) {
  try {
    const { response } = yield race({
      response: call(apiUser.login, credentialsOrToken),
      signout : take(USER_UNSET)
    })

    if (response && response.access_token) {
      yield call(setAuthToken, response)
      yield put(setUser(response))

      if(turn_touch_id_on) {
        yield call(setCache, 'email', credentialsOrToken.username)
        yield call(setCache, 'password', credentialsOrToken.password)

        NavigatorService.navigate('Toc')
      } else {
        NavigatorService.navigate('drawerStack')
      }

      return response
    } else {
      yield call(logout)
      return null
    }
  } catch (error) {
    console.log(error)
    displayError("Could not login. Please try again.")
    yield put(receiveLoginError(error))
  }
}

function* registeredFlow(action) {
  try {
    const { data } = action
    const token = yield call(apiUser.getToken)
    const user = yield call(apiUser.register, data, token['access_token'])

    yield put(setUser(user))

    NavigatorService.navigate('loginStack')
    displaySuccess('Succesfully registerd, a confirmation email has been sent')
  } catch (error) {
    yield put(registerError(error))
    displayError(JSON.parse(error.errors))
  }
}

function* userUpdatedFlow(action) {
  try {
    const { data, id } = action
    const token = yield select(getAccessToken)
    const user = yield call(apiUser.userUpdate, token, data, id)

    yield put(updateUserSuccess(user))
    NavigatorService.navigate('Profile')
    displaySuccess('Profile updated')
  } catch (error) {
    yield put(updateUserError(error))
    displayError(error.errors)
  }
}

function* sendRecoveryEmailFlow(action) {
  try {
    const { data } = action
    const token = yield call(apiUser.getToken)
    yield call(apiUser.sendRecoveryEmail, data, token['access_token'])

    NavigatorService.navigate('loginStack')
    displaySuccess('Email has been sent')
  } catch (error) {
    console.log(error)
    yield put(sendRecoveryEmailError(error))
    displayError(error.errors)
  }
}

function* updatePasswordFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    yield call(apiUser.updatePassword, data, token)

    displaySuccess('Password updated')
  } catch (error) {
    yield put(updatePasswordError(error))
    displayError('Could not update password at this time')
  }
}

function* saveTokenFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    yield call(apiUser.saveToken, data, token)
  } catch (error) {
    console.log(error)
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* loginWatcher () {
  let token = yield call(getAuthToken)

  while (true) {
    const data = yield take(LOGIN_REQUESTED)
    token = yield call(authorize, data.user, data.turn_touch_id_on)

    if (!token)
      continue

    let userSignedOut = false
    while(!userSignedOut) {
      const { expired } = yield race({
        expired: call(delay, token.expires_in * 1000),
        signout: take(USER_UNSET)
      })

      if (expired) {
        token = yield call(refresh, token)
        if(!token) {
          userSignedOut = true
          yield call(logout)
        }
      } else {
        userSignedOut = true
        yield call(logout)
      }

    }
  }
}

function* userWatcher() {
  yield all([
    takeLatest(USER_UPDATED, userUpdatedFlow),
    takeLatest(SAVE_TOKEN, saveTokenFlow),
    takeLatest(REGISTERED, registeredFlow),
    takeLatest(SEND_RECOVERY_EMAIL, sendRecoveryEmailFlow),
    takeLatest(UPDATE_PASSWORD, updatePasswordFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(loginWatcher),
  fork(userWatcher)
];

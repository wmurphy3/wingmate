import {
  USER_UPDATED,
  USER_UPDATED_SUCCESS,
  USER_UPDATED_ERROR,
  REGISTERED,
  REGISTERED_ERROR,
  SEND_RECOVERY_EMAIL_ERROR,
  SEND_RECOVERY_EMAIL,
  USER_SET,
  USER_UNSET,
  LOGIN_REQUESTED,
  LOGIN_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR,
  SAVE_TOKEN,
  USER_INFO_SET,
  USER_UNSET_TOUCH_ID
} from './constants'

export const setUser = (token) => ({
  type: USER_SET,
  token
})

export const getLoginInfo = (username) => ({
  type: USER_INFO_SET,
  username
})

export const unsetTouchID = () => ({
  type: USER_UNSET_TOUCH_ID
})

export const unsetUser = () => ({
  type: USER_UNSET
})

export const login = (user, turn_touch_id_on) => ({
  type: LOGIN_REQUESTED,
  user: user,
  turn_touch_id_on: turn_touch_id_on
})

export const saveToken = (data) => ({
  type: SAVE_TOKEN,
  data
})

export const receiveLoginError = (data) => {
  return {type: LOGIN_ERROR, data: data}
}

export const updateUser = (data, id) => ({
  type: USER_UPDATED,
  id: id,
  data
})

export const updateUserSuccess = (data) => ({
  type: USER_UPDATED_SUCCESS,
  data
})

export const updateUserError = (data) => ({
  type: USER_UPDATED_ERROR,
  data
})

export const register = (data) => ({
  type: REGISTERED,
  data
})

export const registerError = (data) => ({
  type: REGISTERED_ERROR,
  data
})

export const sendRecoveryEmail = (data) => ({
  type: SEND_RECOVERY_EMAIL,
  data
})

export const sendRecoveryEmailError = (data) => ({
  type: SEND_RECOVERY_EMAIL_ERROR,
  data
})

export const updatePassword = (data) => ({
  type: UPDATE_PASSWORD,
  data
})

export const updatePasswordError = (data) => ({
  type: UPDATE_PASSWORD_ERROR,
  data
})

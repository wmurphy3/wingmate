import {
  USER_UPDATED, USER_UPDATED_SUCCESS, USER_UPDATED_ERROR,
  REGISTERED, REGISTERED_ERROR,
  SEND_RECOVERY_EMAIL, SEND_RECOVERY_EMAIL_ERROR,
  UPDATE_PASSWORD, UPDATE_PASSWORD_ERROR,
  USER_SET, USER_UNSET, USER_INFO_SET, USER_UNSET_TOUCH_ID
} from './constants'

const initial = {
  loading: false,
  access_token: null,
  email: null,
  id: null,
}

export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        loading: false,
        access_token: action.token.access_token,
        email: action.token.email,
        id: action.token.id,
      }

    case USER_INFO_SET:
      return {
        ...state,
        login_username: action.username
      }

    case USER_UNSET_TOUCH_ID:
      return {
        ...state,
        login_username: null
      }

    case USER_UNSET:
      return {
        login_username: state.login_username
      }

    case REGISTERED:
      return { ...state, loading: true }

    case REGISTERED_ERROR:
      return { ...state, error : action.error }

    case USER_UPDATED:
      return { ...state, loading: true }

    case USER_UPDATED_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.data.email,
        phone: action.data.phone,
        name: action.data.name,
        home_phone: action.data.home_phone,
        username: action.data.username,
        address_line1: action.data.address.address_line1,
        address_line2: action.data.address.address_line2,
        city: action.data.address.city,
        state: action.data.address.state,
        zip: action.data.address.zip
      }

    case USER_UPDATED_ERROR:
      return { ...state, error : action.error }

    case SEND_RECOVERY_EMAIL:
      return { ...state, loading: false }

    case SEND_RECOVERY_EMAIL_ERROR:
      return  { ...state, error: action.data }

    case UPDATE_PASSWORD:
      return { ...state, loading: false }

    case UPDATE_PASSWORD_ERROR:
      return  { ...state, error: action.data }

    default:
      return state
  }
}

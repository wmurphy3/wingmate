import { setUser }  from '*/core/user'
import { parseJwt } from '*/utils/custom_services'

const checkAuthorization = (dispatch) => {
  // attempt to grab the token from localstorage
  // TODO fix for native
  // const storedToken = localStorage.getItem('token')
  const storedToken = null
  // if it exists
  if (storedToken) {

    // parse it down into an object
    const token = JSON.parse(storedToken)
    const tokenPayload = parseJwt(token.access_token)

    // check the expiration against the current date / time
    const expiration = new Date(tokenPayload.exp * 1000)
    const current = new Date().getTime()

    // if the token has expired return false
    if (current > expiration) return false

    // otherwise, dispatch the token to our setClient action
    // which will update our redux state with the token and return true
    dispatch(setUser(token))

    return true
  }

  return false
}

export const checkIndexAuthorization = ({ dispatch }) => {
  // by having a function that returns a function we satisfy 2 goals:
  //
  // 1. grab access to our Redux Store and thus Dispatch to call actions
  // 2. Return a function that includes all the proper .. properties that
  //    React Router expects for us to include and use
  //
  // `nextState` - the next "route" we're navigating to in the router
  // `replace` - a helper to change the route
  // `next` - what we call when we're done messing around
  //

  // we'll make this in a minute - remember begin with the end!
  // If we pass the authentication check, go to widgets
  if (checkAuthorization(dispatch)) {
    return true;
  }
  return false;
}

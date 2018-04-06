import { connect }                    from 'react-redux'
import Component                      from '*/views/components/Login'
import { login, getLoginInfo }        from '*/core/user'
import { reduxForm }                  from 'redux-form'
import { validate }                   from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {username: state.user.login_username},
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (user, turn_touch_id_on) => dispatch(login(user, turn_touch_id_on)),
    getLoginInfo: (username) => dispatch(getLoginInfo(username))
  }
}

const FormComponent = reduxForm({
  form: 'Login',
  validate: validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)

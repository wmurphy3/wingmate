import { connect }            from 'react-redux'
import Component              from '*/views/components/ForgotPassword'
import { sendRecoveryEmail }  from '*/core/user'
import { reset, reduxForm }   from 'redux-form'
import { validate }           from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendRecoveryEmail: (email) => dispatch(sendRecoveryEmail(email))
  }
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('forgot_password'));

const FormComponent = reduxForm({
  form: 'forgot_password',
  validate: validate,
  onSubmitSuccess: afterSubmit,
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)

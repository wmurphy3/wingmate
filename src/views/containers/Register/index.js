import { connect }    from 'react-redux'
import Component      from '*/views/components/Register'
import { register }   from '*/core/user'
import { reduxForm }  from 'redux-form'
import { validate }   from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: (user) => dispatch(register(user))
  }
}

const FormComponent = reduxForm({
  form: 'register',
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)

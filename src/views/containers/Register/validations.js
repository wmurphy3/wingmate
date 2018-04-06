import validator from 'email-validator'

export const validate = (values) => {

  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!validator.validate(values.email)) {
    errors.email = 'Must be a valid email'
  }

  if(!values.password) {
    errors.password = 'Required'
  }

  if(!values.zip) {
    errors.zip= 'Required'
  }

  if(!values.ssn) {
    errors.ssn = 'Required'
  }

  if(!values.loan_number) {
    errors.loan_number = 'Required'
  }

  if(!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  } else if(values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Doesn\'t match password'
  }

  return errors
}

import validator from 'email-validator'

export const validate = (values) => {

  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (!validator.validate(values.username)) {
    errors.username = 'Must be a valid email'
  }

  if(!values.password) {
    errors.password = 'Required'
  }

  return errors
}

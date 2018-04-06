import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  forgot_password_link: {
    color: colors.main,
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  touch_link: {
    color: colors.main,
    marginTop: 5,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: colors.main,
    marginTop: 10
  },
  register_link: {
    marginTop: 20,
    padding: 10,
    color: colors.main,
    textAlign: 'center'
  },
  link: {
    marginTop: 20,
    textAlign: 'center'
  },
  contact_link: {
    color: colors.main,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10
  },
  divider: {
    backgroundColor: colors.border,
    marginTop: 10
  },
  container: {
    borderWidth: 0,
    shadowColor: 'rgba(0,0,0, .0)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    maxWidth: '100%'
  },
  set_up_touch: {
    alignSelf: 'flex-end'
  },
  touch_id: {
    marginLeft:0,
    marginRight: 0,
    padding: 0,
    margin: 0,
    marginTop: 5,
    borderWidth: 0,
    backgroundColor: '#fff'
  }
}

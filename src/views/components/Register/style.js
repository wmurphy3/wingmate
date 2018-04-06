import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  login_link: {
    color: colors.main,
    alignSelf: 'flex-end'
  },
  button: {
    backgroundColor: colors.main,
    marginTop: 10
  },
  container: {
    borderWidth: 0,
    shadowColor: 'rgba(0,0,0, .0)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    maxWidth: '100%',
    marginTop: 50
  }
}

import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_centered: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
  container_progress_title: {
    color: colors.label,
    marginTop: 5
  },
  due_title: {
    color: colors.label,
    fontSize: 13,
  },
  margin: {
    padding: 20
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderColor: colors.border
  },
  border_right: {
    borderRightWidth: 1,
    borderColor: colors.border
  },
  default: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  circles: {
    flexDirection: 'row',
    marginTop: 15
  },
  separate_top: {
    marginTop: 10
  },
  amount: {
    fontSize: 18
  },
  details: {
    fontSize: 13,
    color: colors.labels
  },
  row: {
    flexDirection: 'row'
  },
  size_18: {
    fontSize: 18,
    marginBottom: 5
  }
}

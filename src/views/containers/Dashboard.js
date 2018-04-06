import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/Dashboard'
import { saveToken }   from '*/core/user'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

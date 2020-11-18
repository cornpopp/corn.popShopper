import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminAccountPage from './AdminAccountPage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props

  // console.log('props in userhome', props)

  if (isAdmin === true) {
    // console.log('admin account ', props.user)
    return (
      <div className="content-wrapper">
        <h3>Welcome {firstName}</h3>
        <AdminAccountPage />
      </div>
    )
  } else {
    return (
      <div className="content-wrapper">
        <h3>Welcome {firstName}</h3>
        {/*UserAccountPage*/}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // email: state.user.email,
    user: state.user,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    addressStreet1: state.user.addressStreet1,
    addressStreet2: state.user.addressStreet2,
    addressCity: state.user.addressCity,
    addressPostal: state.user.addressPostal,
    addressCountry: state.user.addressCountry,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  isAdmin: PropTypes.bool
}

import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import RootModal from 'layouts/RootModal/RootModal'

// Note: Stateless/function components *will not* hot reload
// react-transform *only* works on component classes.
function CoreLayout ({ children }) {
  return (
    <div className="page-container">
      <RootModal />
      <div className="view-container">
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout

import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const CameraFilter = (props) => {
  return (
    <div>CameraFilter</div>
  )
}

CameraFilter.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CameraFilter)
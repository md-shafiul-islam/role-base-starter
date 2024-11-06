import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const genericSinglePage = (props) => {
  return (
    <div>genericSinglePage</div>
  )
}

genericSinglePage.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(genericSinglePage)
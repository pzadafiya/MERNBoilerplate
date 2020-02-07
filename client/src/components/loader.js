import React, { Component } from 'react'
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

class Loader extends Component {
  render() {
    return (
      <div className="loading-container">
        <Spinner type="grow" color="primary" className="spinner" />
      </div>
    )
  }
}

// define your prop validations
Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string
};

export default Loader;
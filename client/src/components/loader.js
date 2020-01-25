import React, { Component } from 'react'
import { Spinner } from 'reactstrap';

class Loader extends Component {
  render() {
    return (
      <div className="loading-container">
        <Spinner type="grow" color="primary" className="spinner" />
      </div>
    )
  }
}

export default Loader;
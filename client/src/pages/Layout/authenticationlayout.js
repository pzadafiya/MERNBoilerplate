
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import Notification from '../../components/notification'

class AuthLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.alert && this.props.alert.messageInfo ?
                    <Notification {...this.props.alert.messageInfo} /> : null
                }
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-lg-6 col-md-8 mx-auto">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}


export default withRouter(connect(mapState)(AuthLayout));
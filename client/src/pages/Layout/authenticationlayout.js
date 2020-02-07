
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Notification from '../../components/notification';

class AuthLayout extends Component {
    render() {
        return (
            <React.Fragment>
                {/* if there is data in props.alert.messageInfo than pass it to Notification component  
                    so this component display message based on data.
                 */}
                {this.props.alert && this.props.alert.messageInfo ?
                    <Notification {...this.props.alert.messageInfo} /> : null
                }
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-lg-6 col-md-8 mx-auto">
                                    {/* child component render here*/}
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

/* Redux mapping */
function mapState(state) {
    const { alert } = state;
    return { alert };
}


export default withRouter(connect(mapState)(AuthLayout));
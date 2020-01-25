import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { alertActions } from '../../store/actions';
import { connect } from 'react-redux';
import Notification from '../../components/notification'

export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.alert && this.props.alert.messageInfo ?
                    <Notification {...this.props.alert.messageInfo} /> : null
                }
                <div id="wrapper">
                    <div className="content-page">
                        <div className="content">
                            {this.props.children}
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

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = withRouter(connect(mapState, actionCreators)(Layout));
export { connectedApp as Layout };

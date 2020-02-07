import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Notification from '../../components/notification';
import { alertActions } from '../../store/actions';
import Footer from './footer';
import Sidebar from './sidebar';
import Topbar from './topbar';

export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {/* if there is data in props.alert.messageInfo than pass it to Notification component  
                    so this component display message based on data.
                 */}
                {this.props.alert && this.props.alert.messageInfo ?
                    <Notification {...this.props.alert.messageInfo} /> : null
                }
                <div id="wrapper">
                    <Topbar />
                    <Sidebar />
                    <div className="content-page">
                        <div className="content">
                            {/* child component render here*/}
                            {this.props.children}
                        </div>
                        <Footer />
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

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = withRouter(connect(mapState, actionCreators)(Layout));
export { connectedApp as Layout };


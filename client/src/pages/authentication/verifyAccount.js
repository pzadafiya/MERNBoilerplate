import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../../components/loader';
import { verifyaccount } from '../../store/actions';

class VerifyAccount extends Component {

    componentDidMount() {
        this.props.verifyaccount(this.props.match.params.token);
    }

    render() {
        return (
            <div className="card rounded shadow shadow-sm position-relative overflow-hidden">
                <div className="bg-primary">
                    <div className="text-primary text-center p-4"></div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        {this.props.loading ? <Loader /> : null}
                        <span>{this.props.message}</span>
                    </div>
                    <Link to="/login" className="btn btn-primary btn-block"> Sign in</Link>
                </div>
            </div>
        );
    }
}

/* Redux mapping */
function mapState(state) {
    const { loading, message } = state.account.verifyaccount;
    return { loading, message };

}

export default withRouter(connect(mapState, { verifyaccount })(VerifyAccount))

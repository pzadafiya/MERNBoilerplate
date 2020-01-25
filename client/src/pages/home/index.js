import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Notification from '../../components/notification'

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showNotification: false
		}

		this.homeclick = this.homeclick.bind(this);
	}

	homeclick = () => {
		 this.setState({showNotification: true});
	}

	render() {
		return (
			<div className="text-center">

				{this.state.showNotification ? <Notification message_type='success' message='Home button clicked' /> : null}

				<h2>Login Successful!</h2>
				<h3>Welcome {this.props.user.data[0].firstName} </h3>
				<button type="button" className="btn btn-primary" onClick={this.homeclick} >Home</button>
				<Link className="dropdown-item" to="/login">Logout</Link>
			</div>
		)
	}
}

function mapState(state) {
	const { user } = state.account.authentication;
	return { user };
}

export default withRouter(connect(mapState)(Home));



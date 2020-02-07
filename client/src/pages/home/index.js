import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from 'reactstrap';

class Home extends Component {

	render() {
		return (
			<div className="container-fluid mt-4">
				<Breadcrumb>
					<BreadcrumbItem active>Home</BreadcrumbItem>
				</Breadcrumb>

				<div className="row">
					<div className="col-12">
						<div className="card-box">
							<div className="row">
								<div className="col-12">
									<Jumbotron>
										<h3 className="display-5">Welcome {this.props.user.firstName}!</h3>
										<p className="lead">
											Hi there,
										</p>

										<p className="lead">
											Welcome to the React authentication!
										</p>

										<p className="lead">
											This application is developed for the MERN(MongoDB, ExpressJS, ReactJS, NodeJS) backend purpose only, You can modify UI completely based on your perspectives.This is kind of the boilorplate for any MERN application with in -built function of user authentication such as,
										</p>

										<ul className="lead">
											<li> User Registration</li>
											<li> Email confirmation</li>
											<li> Login </li>
											<li> Forgot Password </li>
											<li> User profile Update</li>
											<li> Change Password</li>
										</ul>

										<p className="lead">
											The developer can customize front end as well as back end, it completely based on their preference and we would love to provide support and guidance.
										</p>

										<p className="lead">
											Thank You
										</p>

									</Jumbotron>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

/* Redux mapping */
function mapState(state) {
	//get data from authentication store
	const { user } = state.account.authentication;
	return { user };
}

export default withRouter(connect(mapState)(Home));



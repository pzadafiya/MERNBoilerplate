import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required')
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.props.logout();
	}

	render() {
		return (
			<div className="card rounded shadow shadow-sm position-relative overflow-hidden">
				<div className="bg-primary">
					<div className="text-primary text-center p-4">
						<h5 className="text-white">Login</h5>
					</div>
				</div>
				<div className="card-body">
					<Formik
						initialValues={{
							email: "",
							password: ""
						}}
						validationSchema={LoginSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.props.login(
								values.email,
								values.password,
								this.props.history
							);
							setSubmitting(false);
						}}
					>
						{({ touched, errors, isSubmitting }) => (
							<Form>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<Field
										type="email"
										name="email"
										placeholder="Enter email"
										autoComplete="false"
										className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="email"
										className="invalid-feedback"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password</label>
									<Field
										type="password"
										name="password"
										autoComplete="false"
										placeholder="Enter password"
										className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="password"
										className="invalid-feedback"
									/>
								</div>

								<button
									type="submit"
									className="btn btn-primary btn-block"
									disabled={isSubmitting}
								> {isSubmitting ? "Please wait..." : "Sign in"}
								</button>
								
								<p className="mb-0 mt-2"> Don't have an account?
									<Link to="/register"> Sign Up</Link></p>

								<Link to="/forgotpassword">Forgot Password?</Link>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}


function mapState(state) {
	const { loggingIn } = state.account.authentication;
	return { loggingIn };
}

export default withRouter(connect(mapState, { login, logout })(Login))
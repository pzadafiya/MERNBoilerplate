import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../components/loader';
import { login, logout, resendverificationlink } from '../../store/actions';

//Schema defined using YUP for form validation 
const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])', 'password not valid')
		.required('Password is required')
});

class Login extends Component {
	//This is the function that sends email verification link 
	ReSendVerificationLink = (email) => {
		this.props.resendverificationlink(email)
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
						validationSchema={loginSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.props.login(
								values.email,
								values.password,
								this.props.history
							);
							setSubmitting(false);
						}}
					>
						{({ values, touched, errors, isSubmitting }) => (
							<React.Fragment>
								{this.props.loading ? <Loader /> : null}
								<Form>
									{/*START : Login form */}
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

									{this.props.isVerifiedUser === false ?
										<button
											type="button"
											className="btn btn-link"
											onClick={() => this.ReSendVerificationLink(values.email)}>
											Re-send verification link
											</button> : null}

									<p className="mb-0 mt-2"> Don't have an account?
									<Link to="/register"> Sign Up</Link></p>
									<Link to="/forgotpassword">Forgot Password?</Link>

									{/*END : Login form */}
								</Form>
							</React.Fragment>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}

/* Redux mapping */
function mapState(state) {
	const { loading, isVerifiedUser } = state.account.authentication;
	return { loading, isVerifiedUser };
}

export default withRouter(connect(mapState, { login, logout, resendverificationlink })(Login))
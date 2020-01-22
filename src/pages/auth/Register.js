import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		// .matches(/[a-z]{2}\d{2}[A-Z]{2}\d{4}$/i, 'invalid password')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Password must match')
		.required('Confirm password required'),
	firstname: Yup.string()
		.required('Firstname is required'),
	lastname: Yup.string()
		.required('Lastname is required'),
	username: Yup.string()
		.required('Username is required')
});

class Register extends Component {
	render() {
		return (
			<div className="card rounded shadow shadow-sm">
				<div className="bg-info">
					<div className="text-primary text-center p-4">
						<h5 className="text-white font-size-20">Signup</h5>
					</div>
				</div>
				<div className="card-body">
					<Formik
						initialValues={{
							email: '',
							password: '',
							confirmpassword: '',
							firstname: '',
							lastname: '',
							username: ''
						}}

						validationSchema={SignupSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.props.register(
								{
									'email': values.email,
									'firstname': values.firstname,
									'lastname': values.lastname,
									'username': values.username,
									'password': values.password
								});
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
										placeholder="Enter password"
										className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="password"
										className="invalid-feedback"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="confirmpassword">Confirm Password</label>
									<Field
										type="confirmpassword"
										name="confirmpassword"
										placeholder="Enter confirmpassword"
										className={`form-control ${touched.confirmpassword && errors.confirmpassword ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="confirmpassword"
										className="invalid-feedback"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="firstname">FirstName</label>
									<Field
										type="firstname"
										name="firstname"
										placeholder="Enter firstname"
										className={`form-control ${touched.firstname && errors.firstname ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="firstname"
										className="invalid-feedback"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="lastname">LastName</label>
									<Field
										type="lastname"
										name="lastname"
										placeholder="Enter lastname"
										className={`form-control ${touched.lastname && errors.lastname ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="lastname"
										className="invalid-feedback"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="username">UserName</label>
									<Field
										type="username"
										name="username"
										placeholder="Enter username"
										className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
									/>
									<ErrorMessage
										component="div"
										name="username"
										className="invalid-feedback"
									/>
								</div>

								<button
									className="btn btn-info btn-block"
									type="submit"
									disabled={isSubmitting}
								>{isSubmitting ? "Please wait..." : "Submit"}
								</button>
								<Link to="/login" className="btn btn-link">Login</Link>
							</Form>
						)}
					</Formik>
				</div>
			</div>

		)
	};
}

export default withRouter(connect(null, { register })(Register));
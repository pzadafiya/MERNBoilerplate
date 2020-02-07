import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import * as Yup from 'yup';
import Loader from '../../components/loader';
import { changepassword } from '../../store/actions';

//Schema defined using YUP for form validation
const changePasswordSchema = Yup.object().shape({
	currentpassword: Yup.string()
		.required('current password is required')
		.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])', 'password not valid'),
	newpassword: Yup.string()
		.required('new password is required')
		.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])', 'password not valid'),
	confirmpassword: Yup.string()
		.oneOf([Yup.ref('newpassword'), null], 'Password must match')
		.required('confirm password required')
});

class ChangePassword extends Component {

	render() {
		return (
			<div className="container-fluid mt-4">

				<Breadcrumb>
					<BreadcrumbItem>Account</BreadcrumbItem>
					<BreadcrumbItem active>Change Password </BreadcrumbItem>
				</Breadcrumb>

				<div className="row">
					<div className="col-6">
						<div className="card-body">
							<Formik
								initialValues={{
									currentpassword: "",
									newpassword: "",
									confirmpassword: ""
								}}

								validationSchema={changePasswordSchema}
								onSubmit={(values, { setSubmitting, resetForm }) => {

									this.props.changepassword(
										{
											'email': this.props.user.email,
											'currentpassword': values.currentpassword,
											'newpassword': values.newpassword
										}, this.props.history);
									setSubmitting(false);
									resetForm();
								}}
							>
								{({ touched, errors, isSubmitting }) => (
									<React.Fragment>
										{this.props.loading ? <Loader /> : null}

										<Form>
											{/*START : change password form */}
											<div className="form-group">
												<label htmlFor="password">Current Password</label>
												<Field
													type="password"
													name="currentpassword"
													placeholder="Current Password"
													autoComplete='false'
													className={`form-control ${touched.currentpassword && errors.currentpassword ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="currentpassword"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="newpassword">New Password</label>
												<Field
													type="password"
													name="newpassword"
													placeholder="New Password"
													autoComplete='false'
													className={`form-control ${touched.newpassword && errors.newpassword ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="newpassword"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="confirmpassword">Confirm Password</label>
												<Field
													type="password"
													name="confirmpassword"
													autoComplete='false'
													placeholder="Confirm Password"
													className={`form-control ${touched.confirmpassword && errors.confirmpassword ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="confirmpassword"
													className="invalid-feedback"
												/>
											</div>

											<button
												className="btn btn-primary"
												type="submit"
												disabled={isSubmitting}
											>{isSubmitting ? "Please wait..." : "Change Password"}
											</button>

											{/*END : change password form */}
										</Form>
									</React.Fragment>
								)}
							</Formik>
						</div>

					</div>
				</div>

			</div>
		)
	}
}

/* Redux mapping */
function mapState(state) {
	const { user } = state.account.authentication;
	return { user };
}

export default withRouter(connect(mapState, { changepassword })(ChangePassword));



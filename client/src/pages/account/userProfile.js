import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../components/loader';
import { updateprofile } from '../../store/actions';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

//Schema defined using YUP for form validation
const profileSchema = Yup.object().shape({
	firstname: Yup.string()
		.required('First name is required'),
	lastname: Yup.string()
		.required('Last name is required'),
	phonenumber: Yup.string()
		.min(12)
});

class UserProfile extends Component {
	render() {
		return (
			<div className="container-fluid mt-4">
				<Breadcrumb>
					<BreadcrumbItem>Account</BreadcrumbItem>
					<BreadcrumbItem active>Profile</BreadcrumbItem>
				</Breadcrumb>
				
				<div className="row">
					<div className="col-6">
						<div className="card-body">
							<Formik
								initialValues={{
									email: this.props.user.email,
									firstname: this.props.user.firstName,
									lastname: this.props.user.lastName,
									phonenumber: this.props.user.phoneNumber
								}}

								validationSchema={profileSchema}
								onSubmit={(values, { setSubmitting }) => {

									this.props.updateprofile(
										{
											'email': this.props.user.email,
											'firstname': values.firstname,
											'lastname': values.lastname,
											'phonenumber': values.phonenumber,
										}, this.props.history);
									setSubmitting(false);
								}}
							>
								{({ touched, errors, isSubmitting }) => (
									<React.Fragment>
										{this.props.loading ? <Loader /> : null}

										<Form>
											{/*START : Profile form */}
											<div className="form-group">
												<label htmlFor="email">Email</label>
												<Field
													type="email"
													name="email"
													placeholder="Email"
													disabled
													className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="firstname">First Name</label>
												<Field
													type="firstname"
													name="firstname"
													placeholder="First Name"
													className={`form-control ${touched.firstname && errors.firstname ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="firstname"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="lastname">Last Name</label>
												<Field
													type="lastname"
													name="lastname"
													placeholder="Last name"
													className={`form-control ${touched.lastname && errors.lastname ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="lastname"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="phonenumber">Phone Number</label>
												<Field
													type="text"
													name="phonenumber"
													placeholder="Phone Number"
													className={`form-control ${touched.phonenumber && errors.phonenumber ? "is-invalid" : ""}`}
												/>
												<ErrorMessage
													component="div"
													name="phonenumber"
													className="invalid-feedback"
												/>
											</div>
											<button
												className="btn btn-primary"
												type="submit"
												disabled={isSubmitting}
											>{isSubmitting ? "Please wait..." : "Update Profile"}
											</button>
											{/*END : User Profile form */}
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

export default withRouter(connect(mapState, { updateprofile })(UserProfile));



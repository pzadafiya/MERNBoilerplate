import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../components/loader';
import { updateprofile } from '../../store/actions';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Thumb from "../../components/thumb";
import MaskedInput from "react-text-mask";

//Schema defined using YUP for form validation
const profileSchema = Yup.object().shape({
	firstname: Yup.string()
		.required('First name is required'),
	lastname: Yup.string()
		.required('Last name is required'),
	phonenumber: Yup.string()
		.min(12)
});

const phoneNumberMask = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

class UserProfile extends Component {
	state = {
		previewImage: undefined
	};

	componentDidMount() {
		this.setState({ previewImage: this.props.user.profileimage });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user && this.props.user.profileimage !== prevProps.user.profileimage) {
			this.setState({ previewImage: this.props.user.profileimage });
		}
	}

	render() {
		const { previewImage } = this.state;

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
									phonenumber: this.props.user.phoneNumber,
									profileimage: this.props.user.profileimage
								}}

								validationSchema={profileSchema}
								onSubmit={(values, { setSubmitting }) => {
									this.props.updateprofile(
										{
											'email': this.props.user.email,
											'firstname': values.firstname,
											'lastname': values.lastname,
											'phonenumber': values.phonenumber,
											'profileimage': values.profileimage
										}, this.props.history);
									setSubmitting(false);
								}}
							>
								{({ values, touched, errors, isSubmitting, setFieldValue }) => (
									<React.Fragment>
										{this.props.loading ? <Loader /> : null}

										<Form>
											{/*START : Profile form */}
											<div className="form-group">
												<label htmlFor="email">Email<span className="text-danger" title="This is required">*</span></label>
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
												<label htmlFor="firstname">First Name<span className="text-danger" title="This is required">*</span></label>
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
												<label htmlFor="lastname">Last Name<span className="text-danger" title="This is required">*</span></label>
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
													name="phonenumber"
													render={({ field }) => (
														<MaskedInput
															{...field}
															mask={phoneNumberMask}
															type="text"
															name="phonenumber"
															placeholder="Phone Number"
															className={`form-control ${touched.phonenumber && errors.phonenumber ? "is-invalid" : ""}`}
														/>
													)}
												/>

												<ErrorMessage
													component="div"
													name="phonenumber"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="profileimage">Profile Image</label>

												<input id="file" name="profileimage" type="file" onChange={(event) => {
													setFieldValue("profileimage", event.currentTarget.files[0]);
													this.setState({ previewImage: event.currentTarget.files[0] });
												}}
													className={`form-control ${touched.profileimage && errors.profileimage ? "is-invalid" : ""}`}
												/>

												<Thumb file={previewImage} />

												<ErrorMessage
													component="div"
													name="profileimage"
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
	const { loading, user } = state.account.authentication;
	return { loading, user };
}

export default withRouter(connect(mapState, { updateprofile })(UserProfile));



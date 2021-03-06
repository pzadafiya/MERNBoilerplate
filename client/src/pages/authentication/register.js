import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import Loader from '../../components/loader';
import { register } from '../../store/actions';
import MaskedInput from "react-text-mask";

//Schema defined using YUP for form validation 
const signupSchema = Yup.object().shape({
	firstname: Yup.string()
		.required('First name is required'),
	lastname: Yup.string()
		.required('Last name is required'),
	email: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])', 'password not valid')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Password must match')
		.required('Confirm password is required'),
	phonenumber: Yup.string(),
	termsandcondition: Yup.bool()
		.test('termsandcondition', 'You have to agree with our Terms and Conditions!', value => value === true)
		.required('You have to agree with our Terms and Conditions!')
});

const phoneNumberMask = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSimpleModalOpen: false
		}
	}

	toggleModal = (e, sname) => {
		let prevValue = this.state[sname];
		var objStates = {};
		objStates[sname] = !prevValue;
		this.setState(objStates);
	}

	render() {
		return (
			<div className="card rounded shadow shadow-sm position-relative overflow-hidden">
				<div className="bg-primary">
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
							phonenumber: '',
							termsandcondition: false
						}}

						validationSchema={signupSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.props.register(
								{
									'email': values.email,
									'firstname': values.firstname,
									'lastname': values.lastname,
									'password': values.password,
									'phonenumber': values.phonenumber,
									'termsandcondition': values.termsandcondition,
								}, this.props.history);

							setSubmitting(false);
						}}
					>
						{({ touched, errors, isSubmitting }) => (
							<React.Fragment>
								{this.props.loading ? <Loader /> : null}

								<Form>
									{/*START : register form */}
									<div className="form-group">
										<div className="row">
											<div className="col-12 col-md-6">
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
											<div className="col-12 col-md-6">
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
										</div>
									</div>



									<div className="form-group">
										<label htmlFor="email">Email<span className="text-danger" title="This is required">*</span></label>
										<Field
											type="email"
											name="email"
											placeholder="Email"
											className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
										/>
										<ErrorMessage
											component="div"
											name="email"
											className="invalid-feedback"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="password">Password<span className="text-danger" title="This is required">*</span></label>
										<Field
											type="password"
											name="password"
											placeholder="Password"
											autoComplete="false"
											className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
										/>
										<ErrorMessage
											component="div"
											name="password"
											className="invalid-feedback"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="confirmpassword">Confirm Password<span className="text-danger" title="This is required">*</span></label>
										<Field
											type="password"
											name="confirmpassword"
											placeholder="Confirm Password"
											autoComplete="false"
											className={`form-control ${touched.confirmpassword && errors.confirmpassword ? "is-invalid" : ""}`}
										/>
										<ErrorMessage
											component="div"
											name="confirmpassword"
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
										<div className="form-check form-check-inline">
											<div className="form-group mb-0">
												<div className="custom-control custom-checkbox">
													<Field
														type="checkbox"
														id="termsandcondition"
														name="termsandcondition"
														className={`custom-control-input ${touched.termsandcondition && errors.termsandcondition ? "is-invalid" : ""}`}
													/>
													<label
														className="custom-control-label"
														htmlFor="termsandcondition">I Accept
												</label>
													<Link to="#" onClick={(e) => this.toggleModal(e, "isSimpleModalOpen")} className="text-primary cursor-pointer"> Terms And Condition</Link>
													<ErrorMessage
														component="div"
														name="termsandcondition"
														className="invalid-feedback"
													/>
												</div>

												<Modal isOpen={this.state.isSimpleModalOpen} toggle={(e) => this.toggleModal(e, "isSimpleModalOpen")}  >
													<ModalHeader toggle={(e) => this.toggleModal(e, "isSimpleModalOpen")} >Terms and Conditions for MERN Boilerplate</ModalHeader>
													<ModalBody>
														<h5 className="font-16">Introduction</h5>
														<p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, <span className="highlight preview_website_name">Webiste Name</span> accessible at <span className="highlight preview_website_url">Website.com</span>.</p>
														<p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>

													</ModalBody>
													<ModalFooter>
														<Button type="button" color="light" onClick={(e) => this.toggleModal(e, "isSimpleModalOpen")} >Close</Button>
														<Button type="button" color="primary" onClick={(e) => this.toggleModal(e, "isSimpleModalOpen")}>I Agree</Button>
													</ModalFooter>
												</Modal>

											</div>
										</div>
									</div>

									<button
										className="btn btn-primary btn-block"
										type="submit"
										disabled={isSubmitting}
									>{isSubmitting ? "Please wait..." : "Register"}
									</button>

									<p className="mb-0 mt-2">Already have an account ?
									<Link to="/login" className=""> Sign in</Link></p>

									{/*END: register form */}
								</Form>
							</React.Fragment>
						)}
					</Formik>
				</div>
			</div>

		)
	};
}

/* Redux mapping */
function mapState(state) {
	const { loading } = state.account.register;
	return { loading };
}

export default withRouter(connect(mapState, { register })(Register));
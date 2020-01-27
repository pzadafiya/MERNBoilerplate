import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotpassword } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from 'yup';
import Loader from '../../components/loader';

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required')
});

class ForgotPassword extends Component {

    render() {
        return (
            <div className="card rounded shadow shadow-sm overflow-hidden">
                <div className="bg-primary">
                    <div className="text-primary text-center p-4">
                        <h5 className="text-white font-size-20">Recover Account</h5>
                    </div>
                </div>

                <div className="card-body ">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            this.props.forgotpassword(values.email);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <React.Fragment>
                                {this.props.loading ? <Loader /> : null}

                                <Form>
                                    <div className="form-group">
                                        <p>Please enter your email address. You will receive a link to create a new password via email.</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter Your Email Address"
                                            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isSubmitting}
                                    > {isSubmitting ? "Please wait..." : "Send"}
                                    </button>
                                </Form>
                            </React.Fragment>)}
                    </Formik>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loading } = state.account.forgotpassword;
    return { loading };
}
export default withRouter(connect(mapState, { forgotpassword })(ForgotPassword));

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetpassword } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('password is required'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password required')
});

class ResetPassword extends Component {
    render() {
        return (
            <div className="card rounded shadow shadow-sm">
                <div className="bg-info">
                    <div className="text-primary text-center p-4">
                        <h5 className="text-white font-size-20">Reset Password</h5>
                    </div>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            password: "",
                            confirmpassword: ""
                        }}
                        validationSchema={ResetPasswordSchema}

                        onSubmit={(values, { setSubmitting }) => {
                            const token = this.props.match.params.token;
                            const password = values.password;
                            this.props.resetpassword({ token, password });
                            setSubmitting(false);
                        }}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        autoComplete='false'
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
                                        type="password"
                                        name="confirmpassword"
                                        autoComplete='false'
                                        placeholder="Enter Confirm Password"
                                        className={`form-control ${touched.confirmpassword && errors.confirmpassword ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="confirmpassword"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-info btn-block"
                                    disabled={isSubmitting}
                                > {isSubmitting ? "Please wait..." : "Submit"}
                                </button>
                                <Link to="/login" className="btn btn-link">login</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { resetpassword } = state.account.resetpassword;
    return { resetpassword };
}

export default withRouter(connect(mapState, { resetpassword })(ResetPassword));

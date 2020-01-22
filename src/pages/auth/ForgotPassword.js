import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { forgotpassword } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required')
});


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className="card rounded shadow shadow-sm">
                <div className="bg-info">
                    <div className="text-primary text-center p-4">
                        <h5 className="text-white font-size-20">Forgot Password</h5>
                    </div>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            this.setState({ loading: true })
                            this.props.forgotpassword(values.email);
                            this.setState({ loading: false })
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
    const { forgotpassword } = state.account.forgotpassword;
    return { forgotpassword };
}
export default withRouter(connect(mapState, { forgotpassword })(ForgotPassword));

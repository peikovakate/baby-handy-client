import React, { Component } from "react"
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                first_name: '',
                lang: "eng",
            },
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {

            this.setState({ submitted: true });
            const { user } = this.state;
            const { dispatch } = this.props;
            // TODO: add other properties to check before submiting
            if (user.email && user.password) {
                dispatch(userActions.register(user));
            }
        }
    }

    validateForm() {

        let email = this.state.user["email"];
        let password = this.state.user["password"];
        let first_name = this.state.user["first_name"];
        let errors = {};
        let formIsValid = true;

        //first name validation
        if (!first_name) {
            formIsValid = false;
            errors["first_name"] = "*Please enter your first name.";
        }

        if (typeof first_name !== "undefined") {
            if (!first_name.match(/^[a-zA-Z\s]*$/)) {
                formIsValid = false;
                errors["first_name"] = "*Please use only letters for your first name";
            }
        }

        //email validation
        if (!email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }

        if (typeof email !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email.";
            }
        }

        //password validation
        if (!password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof password !== "undefined") {
            if (!password.match(/^.*(?=.{6,})(?=.*\d).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter a password longer than 6 characters and at least one digit.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }

    render() {
        return (
            <div className='card-panel' style={{margin:20}}>
                <form name="SignUp" onSubmit={this.handleSubmit} >
                    <h5>Register</h5>
                    <div className="input-field">
                        <label htmlFor='email'>Email</label>
                        <input type="text" name="email" onChange={this.handleChange} value={this.state.user.email} />
                        <div className="errorMsg">{this.state.errors.email}</div>
                    </div>
                    <div className="input-field">
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.user.password} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" onChange={this.handleChange} value={this.state.user.first_name} />
                        <div className="errorMsg">{this.state.errors.first_name}</div>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light cyan lighten-1" >Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedSignUp = connect(mapStateToProps)(SignUp);
export { connectedSignUp as SignUp };

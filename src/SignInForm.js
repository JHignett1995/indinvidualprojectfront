import React, { Component } from 'react';
import './SignInForm.css';


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            if (this.state.email.includes("@qa.com") || this.state.email.includes("@academytrainee.com")) {
                if (this.state.email.includes("\"\!¬`\|£$%^&*()?/,;:#~[]{}=+") || this.state.password.includes("\"\!¬`\|£$%^&*()?/,;:#~[]{}=+")) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleLogin(this.state.email, this.state.password);
    }
  render() {
    return (
        <div className="SignIn">
            <form id="loginForm" onSubmit={this.handleSubmit}>
                Sign In
                <p><input
                    autoFocus
                    id = "email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange} /></p>
                <p><input
                    id = "password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password" /></p>
                <button
                    size="large"
                    disabled={!this.validateForm()}
                    type="submit">Login</button>
            </form>
      </div>
    );
  }
}

export default SignInForm;

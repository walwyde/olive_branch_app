import React from "react";
import PropTypes from "prop-types";
import Form from "../common/Form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../Actions/auth";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    resetData: {
      email: "",
      password: "",
      newpassword: "",
    },
    errors: {},
    showPass: false,
    loginAttempts: 0,
  };

  Schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(0).max(8).label("Password"),
  };
  passwordSchema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(0).max(8).label("Password"),
    newpassword: Joi.string()
      .required()
      .min(0)
      .max(8)
      .label("Password"),
  };

  validateInput = (e) => {
    const { name, value } = e.target;
    const obj = { [name]: value }; // [name] is a computed property name
    const Schema = { [name]: this.passwordSchema[name] };
    const { error } = Joi.validate(obj, Schema);
    return error ? error.details[0].message : null;
  };
  handlePasswordReset = (e) => {
    e.preventDefault();
    toast.success("password Reset Successful");
    console.log(this.state.resetData);
  };
  handleCheckChange = () => {
    this.setState({ showPass: !this.state.showPass });
  };

  resetDataChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(e);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    const data = { ...this.state.resetData };
    data[name] = value;
    this.setState({ resetData: data, errors });
  };
  doSubmit = () => {
    const attempts = this.state.loginAttempts;
    this.setState({ loginAttempts: attempts + 1 });
    this.props.login(this.state.data, this.props.history);
  };
  resetPasswordValidate = () => {
    const options = { abortEarly: false };
    const body = { ...this.state.resetData };
    delete body._id;
    const { error } = Joi.validate(body, this.passwordSchema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  render() {
    const { data, errors, resetData } = this.state;
    return (
      <div>
        <h3 className="center yellow-text">Login</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput(
            "password",
            "Password",
            this.state.showPass ? "text" : "password"
          )}
          <div className="input-field">
            <p>
              <label className="yellow-text">
                <input
                  checked={this.state.showPass}
                  type="checkbox"
                  id="showPass"
                  onChange={() => this.handleCheckChange()}
                />
                <span>
                  {" "}
                  {this.state.showPass ? "Hide Password " : "Show Password "}
                </span>
              </label>
            </p>
          </div>

          {this.renderButton("Login", "btn")}
        </form>
        <div className=" center-align mt-2 text-white">
          Don't have an account?{" "}
          <Link className="yellow-text" to="/register">
            Register{" "}
          </Link>
        </div>
        {this.state.loginAttempts > 3 && (
          <a href="#password-reset" className="yellow-text modal-trigger">
            Forgot Password?
          </a>
        )}

        <div id="password-reset" className="modal green">
          <div className="modal-content">
            <h5 className="yellow-text center">Password Reset</h5>
            <form>
              <div className="input-field">
                <input
                  onChange={(e) => this.resetDataChange(e)}
                  type="email"
                  name="email"
                  id="email"
                  value={resetData.email}
                />
                <label htmlFor="email">What is your email?</label>
                {errors && (
                  <div className="red-accent-4 yellow-text">{errors.email}</div>
                )}
              </div>

              <div className="modal-footer green">
                {
                  <button
                    href="#passwordModal-2"
                    className="btn modal-trigger modal-close"
                  >
                    Next
                  </button>
                }
              </div>
            </form>
          </div>
        </div>

        <div className="modal green" id="passwordModal-2">
          <div className="modal-content">
            <h5 className="yellow-text center">Create New password</h5>
            <form onSubmit={(e) => this.handlePasswordReset(e)}>
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={resetData.password}
                  onChange={(e) => this.resetDataChange(e)}
                />
                <label htmlFor="password">New Password</label>
                {errors && (
                  <div className="red-accent-4 yellow-text">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="input-field">
                <input
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={resetData.newpassword}
                  onChange={(e) => this.resetDataChange(e)}
                />
                <label htmlFor="newpassword">Confirm New Password</label>
                {errors && (
                  <div className="red-accent-4 yellow-text">
                    {errors.newpassword}
                  </div>
                )}
              </div>
          <div className="modal-footer green">
            {
              <button
                className="btn modal-close"
              >
                Reset
              </button>
            }
          </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);

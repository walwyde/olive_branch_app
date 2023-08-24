import React, { Fragment } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import {logout} from '../../Actions/auth'
import {connect} from 'react-redux'

const Navbar = ({logout, auth: {user, isAuthenticated, loading}}) => {
  const authLinks = () => (
    <div>
      <li>
        <Link to="/dashboard">
          DASHBOARD
          <i className="material-icons left ">dashboard</i>
        </Link>
      </li>
      <li>
        <Link to="/messages">
          MESSAGES
          <i className="material-icons left">message</i>
        </Link>
      </li>
      <li>
        <Link to="/appointments"> TALK TO US </Link>
      </li>
      <li>
        <Link onClick={() => logout()} to="#">LOGOUT </Link>
      </li>
    </div>
  );
  const guestLinks = () => (
    <div>
      <li>
        <Link to="/content"> TOPICS</Link>
      </li>
      <li>
        <Link to="/resources"> RESOURCES</Link>
      </li>

      <li>
        {" "}
        <Link to="/about"> ABOUT</Link>
      </li>
      <li>
        <Link to="/login"> LOGIN </Link>
      </li>
      <li>
        {" "}
        <Link to="/register"> REGISTER </Link>
      </li>
    </div>
  );
  return (
    <Fragment>
      <nav
        className="nav-wrapper transparent"
        style={{
          overflowY: "hidden",
        }}
      >
        <div className="container">
          <Link to="/" className="nav-logo left ">
            <img
              src="OliveBranch.png"
              alt=""
              style={{
                width: "5rem",
              }}
            />
          </Link>
          <Link
            to="#"
            className="sidenav-trigger hide-on-med-and-up right"
            data-target="mobile-icons"
          >
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-small-only">
            { !loading && isAuthenticated ? authLinks() : guestLinks()}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-icons">
      { !loading && isAuthenticated ? authLinks() : guestLinks() }
      </ul>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);

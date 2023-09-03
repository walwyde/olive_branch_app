import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import DoctorList from "./DoctorList";
import BookedAppointment from "./BookedAppointment";
import {
  getDoctors,
  getBookedAppointments,
  deleteAppointment,
} from "../../Actions/appointment";

const Appointments = ({
  getDoctors,
  appointment: { doctors, loading },
  auth,
  history,
}) => {
  useEffect(() => {
    getDoctors();
  }, []);

  return auth.user && auth.user.isStaff ? (
    <div className="center">
      <h4 className="yellow-text">Booked Appointments</h4>
      <BookedAppointment />
    </div>
  ) : (
    <Fragment>
      <div className="row white-text">
        <div className="col m7">
          {!loading && doctors.length < 1 ? (
            <h5 className="yellow-text">No Doctors Available</h5>
          ) : (
            <div>
              <h5 className="yellow-text">Available Doctors</h5>
              <DoctorList doctors={doctors} loading={loading} />
            </div>
          )}

          <button
            onClick={() => history.push("/dashboard")}
            className="btn-small"
          >
            Back To Dashboard
          </button>
        </div>

        <div className="col m5">
          <div className="center">
            <h4 className="yellow-text">Booked Appointments</h4>
          </div>
          <BookedAppointment />
        </div>
      </div>
    </Fragment>
  );
};

Appointments.propTypes = {
  getDoctors: PropTypes.func.isRequired,
  getBookedAppointments: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointment: state.appointment,
});
export default connect(mapStateToProps, {
  getDoctors,
  getBookedAppointments,
  deleteAppointment,
})(withRouter(Appointments));

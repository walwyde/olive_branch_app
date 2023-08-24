import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAppointment } from "../../Actions/appointment";

const DoctorList = ({ doctors, newAppointment, loading }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [date, setDate] = useState({
    date: "",
  });

  const handleAppointmentBooking = () => {
    if (selectedDoctor && selectedTimeSlot) {
      // Implement your logic to handle appointment booking here
      console.log(
        `Appointment booked for ${selectedDoctor.user.name} at ${selectedTimeSlot} on ${date}`
      );
      newAppointment(selectedDoctor._id, selectedTimeSlot, date);
    }
  };

  return (
    <Fragment>
      {!loading &&
        doctors &&
        doctors.map((doctor) => (
          <div key={doctor._id} className="mb-3">
            <div>
              <Link to={`profile/${doctor._id}`} className="text-primary">
                {" "}
                Doctor: {doctor.title} {doctor.user.name}
              </Link>
            </div>
            <div>
              <div>Available Time Slots:</div>
              <ul>
                {doctor.availability.map((slot) => (
                  <li
                    key={slot._id}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    active={selectedTimeSlot === slot.time}
                    style={{ cursor: "pointer" }}
                  >
                    <p> {slot.day}</p>
                    <p>{slot.time}</p>
                    <hr />
                  </li>
                ))}
              </ul>

              <div>Propose Date:</div>
              <div className="input-field">

                <input
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  style={{ cursor: "pointer" }}
                  value={date}
                  id="date"

                />
                <label htmlFor="date">Propose Date</label>
              </div>
            </div>
            <div>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                disabled={!selectedTimeSlot}
              >
                Select Doctor
              </button>{" "}
              {selectedDoctor && (
                <button
                  onClick={() => handleAppointmentBooking()}
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        ))}
    </Fragment>
  );
};

DoctorList.propTypes = {
  // newAppointment: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired,
};

export default connect(null, { newAppointment })(DoctorList);

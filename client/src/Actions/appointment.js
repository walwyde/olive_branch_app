// import fetch from "fetch";


import {
  get_appointments,
  get_appointment,
  new_appointment,
  appointment_error,
  delete_appointment,
  update_appointment,
  get_doctors,
  no_doctors,
  load_availability,
  approved_appointment,
} from "./types";

import { setAlert } from "../Utils/setAlert";

export const addAvailability = (availability) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await fetch.post(
      "http://localhost:5005/api/profile/me/availability",
      availability,
      config
    );

    console.log(res);

    dispatch({
      type: load_availability,
      payload: res.data,
    });
    dispatch(setAlert("Appointment Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch(setAlert(errors.msg, "danger"));
    console.log(err);
    dispatch(setAlert("Appointment not added", "danger"));
  }
};
export const clearAvailability = () => async (dispatch) => {
  try {
    const res = await fetch.delete(
      "http://localhost:5005/api/profile/me/availability"
    );

    dispatch({
      type: load_availability,
      payload: res.data,
    });

    dispatch(setAlert("Availability Cleared", "success"));
  } catch (err) {
    console.log(err);
  }
};
export const getDoctors = () => async (dispatch) => {
  try {
    const res = await fetch.get(
      "http://localhost:5005/api/appointment/doctors"
    );

    if (res.data.errors === 0) {
      return dispatch({
        type: no_doctors,
        payload: res.data.errors.msg,
      });
    }

    dispatch({
      type: get_doctors,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: no_doctors,
      payload: err.response 
    });
  }
};

// Get all appointments

export const getAppointment = (id) => async (dispatch) => {
  try {
    const res = await fetch.get(`http://localhost:5005/api/appointment/${id}`);

    console.log(res);
    dispatch({
      type: get_appointment,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const newAppointment = (doctor, time, date) => async (dispatch) => {
  const formData = {
    doctor,
    time,
    date,
  };
  try {
    const res = await fetch.post(
      "http://localhost:5005/api/appointment",
      formData
    );

    if (res) {
      dispatch({
        type: new_appointment,
        payload: res.data,
      });
      dispatch(setAlert("Appointment Created", "success"));
    }
  } catch (err) {
    // dispatch({
    //   type: appointment_error,
    //   payload: { msg: err.response, status: err.response.status }
    // });
    console.log(err.response);
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    const res = await fetch.delete(
      `http://localhost:5005/api/appointment/${id}`
    );

    if (res) {
      dispatch({
        type: delete_appointment,
        payload: id,
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
    // dispatch({
    //   type: appointment_error,
    //   payload: { msg: err.response.data, status: err.response.status },
    // });
  }
};

export const updateAppointment = (id, formData) => async (dispatch) => {
  try {
    const res = await fetch.put(`/api/appointment/${id}`, formData);
    dispatch({
      type: update_appointment,
      payload: { id, appointment: res.data },
    });
    dispatch(setAlert("Appointment Updated", "success"));
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const getBookedAppointments = () => async (dispatch) => {
  try {
    const res = await fetch.get("http://localhost:5005/api/appointment");

    dispatch({
      type: get_appointments,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const approveAppointment = (id) => async (dispatch) => {
  try {
    const res = await fetch.put(`http://localhost:5005/api/appointment/${id}`, {
      _id: id,
    });

    console.log(res.data);

    if (res) {
      dispatch({
        type: approved_appointment,
        payload: res.data,
      });

      dispatch(() => setAlert("Appointment Approved", "success"));
    }
  } catch (error) {
    console.log(error);
    dispatch(() => setAlert("OOPS! Something went wrong", "danger"));
  }
};

import axios from "axios";

import {
  load_profile,
  profile_error,
  delete_account,
  clear_profile,
  delete_profile_error,
  availability_error,
  add_availability,
  profile_image_update,
} from "./types";
import { setAlert } from "../Utils/setAlert";
import { loadUser } from "./auth";

export const loadCurrentProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: clear_profile,
    });
    const res = await axios.get("/api/profile/me");
    if (res)
      dispatch({
        type: load_profile,
        payload: res.data,
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: profile_error,
    });
  }
};

export const createProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:5005/api/profile/me",
      formData,
      config
    );

    if (res.errors)
      return res.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );

    if (res.data !== null) history.push("/profile");

    dispatch({
      type: load_profile,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert("Registration Successful", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    dispatch({
      type: profile_error,
      payload: errors ? errors : err.response.data,
    });
  }
};

/**
 * Edit user profile
 * @param formData - The form data to be edited
 * @param history - The history object for navigation
 * @param id - The id of the user
 * @param userType - Optional user type, defaults to "user"
 * @returns Promise<void>
 */
export const editProfile =
  (formData) => async (dispatch) => {
    try {
     

      dispatch({
        type: load_profile,
        payload: formData,
      });

      dispatch(setAlert("Profile Edit Successful", "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Profile Edit Error", "danger"));

      dispatch({
        type: profile_error,
      });
    }
  };

export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: clear_profile,
    });

    const response = await axios.get(
      `http://localhost:5005/api/profile/${userId}`
    );

    if (response) {
      dispatch({
        type: load_profile,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: profile_error,
      payload: err.response.data,
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    try {
      await axios.delete("http://localhost:5005/api/profile/me");

      dispatch({
        type: delete_account,
      });

      dispatch(setAlert("Account Deleted", "success"));
    } catch (err) {
      console.log(err);
      dispatch({
        type: delete_profile_error,
      });
    }
  }
};

export const addAvailability = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5005/api/profile/me/availability`
    );

    if (res.errors) return dispatch(setAlert(res.error.msg, "danger"));

    dispatch({
      type: add_availability,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: availability_error,
      payload: err.response.data,
    });
  }
};

export const updateProfileImage = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5005/api/profile/avatar",

      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.status >= 200 && res.status < 400) {
      dispatch(setAlert("Profile image updated", "success"));

      dispatch({
        type: profile_image_update,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch(setAlert("Profile image update failed", "danger"));

    console.error("Error uploading image", error);
  }
};

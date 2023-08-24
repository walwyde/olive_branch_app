import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import { displayContent } from "../../Actions/contentDisplay";

class EditStaffProfile extends Form {
  state = {
    data: {
      title: "",
      fullname: "",
      specialty: "",
      bio: "",
      employer: "",
      address: "",
      phone: "",
      email: "",
      fee: "",
      availableDay: "",
      availableTime: "",
    },
    errors: {},
  };

  Schema = {
    title: Joi.string().required().label("Professional Title"),
    fullname: Joi.string().required().label("Your Full Name"),
    specialty: Joi.string().required().label("Field of Specialty"),
    bio: Joi.string().required().label("Brief Biography"),
    employer: Joi.string().required().label("Employer"),
    address: Joi.string().required().label("Your Address"),
    phone: Joi.number().required().label("Your Phone Number"),
    email: Joi.string().required().label("Your Email"),
    fee: Joi.string().required().label("Your Fee"),
    availableDay: Joi.string().label("day"),
    availableTime: Joi.string().label("time"),
  };

  days = ["Select Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  times = ["Select Time", "Morning", "Afternoon", "Evening"];

  addAvailability = (e) => {
    e.preventDefault();

    console.log({
      data: this.state.data,
    });
  };

  dosubmit = () => {
    console.log({ formData: this.state.data });
  };
  render() {
    return (
      <div>
        <h2 className="center yellow-text">Edit Staff Profile Form</h2>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          please Caplitalize your title, eg: Doctor, Councellor...
          {this.renderInput("title", "Enter Your Title", "text")}
          {this.renderInput("fullname", "Ful Name", "text")}
          {this.renderInput("specialty", "field of Specialty", "text")}
          {this.renderInput("bio", "Brief Bio", "text")}
          {this.renderInput("employer", "Employer", "text")}
          {this.renderInput("address", "Enter Your Address", "text")}
          {this.renderInput("email", "Enter Contact Email", "text")}
          {this.renderInput("phone", "Enter Contact Phone", "number")}
          {this.renderInput("fee", "Enter Service Fee", "text")}
          <h5 className=" center">Update your availability...</h5>
          <p className="yellow-text">Select Day(s) you are available</p>
          {this.renderSelect("availableDay", "Select Available Day", this.days)}
          <p className="yellow-text">
            Select time(s) for day(s) you are available
          </p>
          {this.renderSelect(
            "availableTime",
            "Select Available Time",
            this.times
          )}
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => this.addAvailability(e)}
            className="badge yellow darken-3"
          >
            Add Availablity
          </span>
        </form>
      </div>
    );
  }
}

export default EditStaffProfile;

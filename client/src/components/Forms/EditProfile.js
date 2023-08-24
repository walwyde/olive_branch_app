import React, { Fragment } from "react";
import Joi from "joi-browser";
import Form from "../common/Form";

class CreateProfile extends Form {
  state = {
    data: {
      fullname: "",
      history: "",
      age: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      docName: "",
      docAddress: "",
      docContact: "",
    },
    errors: {},
  };

  Schema = {
    history: Joi.string().required().label("Addiction History"),
    age: Joi.number().required().max(60).label("Age"),
    fullname: Joi.string().required().label("Full Name"),
    gender: Joi.string().required().label("Gender"),
    address: Joi.string().required().label("Address"),
    phone: Joi.number().required().label("Your Phone Number"),
    email: Joi.string().required().label("Your Email"),
    docName: Joi.string().required().label("Your Doctor's Name"),
    docAddress: Joi.string().required().label("Your Doctor's Address"),
    docContact: Joi.string().required().label("Your Doctor's Contact"),
  };
  doSubmit = () => {
    console.log(this.state.data);
  };
  render() {
    return (
      <div>
        <h3 className="center yellow-text">Edit User Profile</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderInput("history", "Addiction History", "text")}
          {this.renderInput("age", "age", "number")}
          {this.renderInput("fullname", "fullname", "text")}
          {this.renderInput("gender", "gender", "text")}
          {this.renderInput("address", "address", "text")}
          {this.renderInput("phone", "phone", "number")}
          {this.renderInput("email", "email", "email")}
          {this.renderInput("docName", "Doctor's Name", "text")}
          {this.renderInput("docAddress", "Doctor's Address", "text")}
          {this.renderInput("docContact", "Doctor's Contact", "text")}

          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default CreateProfile;

import React from "react";
import Form from "react-jsonschema-form";

import "./UserForm.scss"

const UserForm = () => {
  const schema = {
    type: "object",
    required: ["firstName", "email", "dateOfBirth"],
    properties: {
      firstName: {
        title: "name",
        type: "string",
        minLength: 3,
      },
      email: {
        type: "string",
      },
      dateOfBirth: {
        title: "Date of Birth",
        type: "string",
      },
      color: {
        type: "string",
        title: "Favourite Colour",
        default: "#151ce6",
      },
      integerRange: {
        title: "Salary",
        type: "integer",
        minimum: 10000,
        maximum: 250000,
      },
    },
  };

  const uiSchema = {
    integerRange: {
      "ui:widget": "range",
    },
    email: {
      "ui:options": {
        inputType: "email",
      },
    },
    dateOfBirth: {
      "ui:options": {
        inputType: "date",
      },
    },
    color: {
      "ui:widget": "color",
    },
  };

  return (
    //@ts-ignore
    <Form schema={schema} uiSchema={uiSchema} className="userForm" />
  );
};

export default UserForm;

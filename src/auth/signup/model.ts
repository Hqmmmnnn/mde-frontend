import axios from "axios";
import { createEffect, createEvent, forward, restore } from "effector";
import { createForm } from "effector-forms/dist";
import { validationRules } from "../../lib/validationRules";

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerForm = createForm({
  fields: {
    email: {
      init: "" as string,
      rules: [validationRules.email()],
    },
    password: {
      init: "" as string,
      rules: [validationRules.required()],
    },
    firstName: {
      init: "" as string,
      rules: [validationRules.required()],
    },
    lastName: {
      init: "" as string,
      rules: [validationRules.required()],
    },
  },

  validateOn: ["submit"],
});

export const registerUserFx = createEffect<RegisterData, void, Error>(
  async (registerData) => {
    axios
      .post("/auth/register", registerData)
      .then((response) => requestReceived(response.data))
      .catch((e) => requestReceived(e.response.data));
  }
);

const requestReceived = createEvent<string>();
export const $registerResponseFromServer = restore(requestReceived, "");
$registerResponseFromServer.reset(registerForm.$values.updates);

forward({
  from: registerForm.formValidated,
  to: registerUserFx,
});

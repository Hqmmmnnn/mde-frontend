import axios from "axios";
import { createEffect, forward, restore, createEvent } from "effector";
import { createForm } from "effector-forms/dist";
import { loadSessionFx } from "../../features/common/session/session-model";
import { tokenChanged } from "../../features/common/token";
import { validationRules } from "../../lib/validationRules";

type LoginRequest = {
  email: string;
  password: string;
};

type Token = {
  token: string;
};

export const loginForm = createForm({
  fields: {
    email: {
      init: "" as string,
      rules: [validationRules.email()],
      validateOn: ["change"],
    },
    password: {
      init: "" as string,
      rules: [validationRules.required()],
      validateOn: ["change"],
    },
  },

  validateOn: ["submit"],
});

export const loginUserFx = createEffect<LoginRequest, void, Error>(async (loginData) => {
  axios
    .post<Token>("/auth/login", loginData)
    .then((res) => {
      tokenChanged(res.data.token);
      loadSessionFx();
    })
    .catch((e) => loginErrorReceived(e.response.data));
});

const loginErrorReceived = createEvent<string>();
export const $loginErrorFromServer = restore(loginErrorReceived, "");
$loginErrorFromServer.reset(loginForm.$values.updates);

forward({
  from: loginForm.formValidated,
  to: loginUserFx,
});

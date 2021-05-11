import { Rule } from "effector-forms";

export const validationRules = {
  required: (): Rule<string> => ({
    name: "required",
    validator: (value) => Boolean(value),
  }),
  email: (): Rule<string> => ({
    name: "email",
    validator: (value: string) => /\S+@\S+\.\S+/.test(value),
  }),
};

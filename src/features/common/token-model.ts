import { createEvent, createStore } from "effector";

const TOKEN_NAME = "jwt-token";

export const tokenChanged = createEvent<string>();
export const tokenDropped = createEvent<void>();

export const $token = createStore<string | null>(localStorage.getItem(TOKEN_NAME) || null)
  .on(tokenChanged, (_, payload) => payload)
  .on(tokenDropped, () => null);

$token.watch((jwtToken) => {
  if (jwtToken) {
    localStorage.setItem(TOKEN_NAME, jwtToken);
  }
});

tokenDropped.watch(() => localStorage.removeItem(TOKEN_NAME));

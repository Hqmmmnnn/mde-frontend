import axios from "axios";
import { createEffect, createEvent, createStore, forward } from "effector";
import { $token, tokenDropped } from "../token";
import { CurrentUser } from "../user/types";

export const loadSessionFx = createEffect<void, CurrentUser, Error>(async () => {
  const currentUser = await axios.get<CurrentUser>("/currentUser", {
    headers: { Authorization: $token.getState() },
  });

  return currentUser.data;
});

export const sessionDropped = createEvent();

export const $session = createStore<CurrentUser | null>(null);

$session
  .reset(sessionDropped)
  .on(loadSessionFx.doneData, (_, user) => user)
  .on(loadSessionFx.failData, () => null);

export const $isAuthenticated = $session.map((session) => session !== null);

forward({
  from: loadSessionFx.failData,
  to: tokenDropped,
});

forward({
  from: sessionDropped,
  to: tokenDropped,
});

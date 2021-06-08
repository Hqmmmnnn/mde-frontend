import { attach, createEffect, createEvent, createStore, forward } from "effector";
import { LoadSessionRequest, sessionApi } from "../../api/session";
import { User } from "../../api/users";
import { $token, tokenDropped } from "./token-model";

export const sessionDropped = createEvent();
export const $session = createStore<User | null>(null);
export const $isAuthenticated = $session.map((session) => session !== null);

const loadSessionFx = createEffect<LoadSessionRequest, User, Error>(sessionApi.loadSession);
export const loadSessionWithTokenFx = attach({
  effect: loadSessionFx,
  source: $token,
  mapParams: (_: void, token: string | null) => ({ token }),
});

$session
  .reset(sessionDropped)
  .on(loadSessionFx.doneData, (_, user) => user)
  .on(loadSessionFx.failData, () => null);

forward({
  from: loadSessionFx.failData,
  to: tokenDropped,
});

forward({
  from: sessionDropped,
  to: tokenDropped,
});

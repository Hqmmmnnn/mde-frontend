import { createEvent, createStore } from "effector";
import { loadSessionFx } from "../features/common/session/session-model";

export const tabIndexChanged = createEvent<number>();
export const authModalOpened = createEvent();
export const authModalClosed = createEvent();

export const $currentTabIndex = createStore<number>(0).on(tabIndexChanged, (_, index) => index);
export const $isAuthModalOpen = createStore<boolean>(false)
  .on(authModalOpened, () => true)
  .on(authModalClosed, () => false);

loadSessionFx.doneData.watch(() => authModalClosed());

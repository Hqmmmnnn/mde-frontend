import { createEvent, createStore } from "effector";
import { loadSessionWithTokenFx } from "../features/common/session-model";

export const tabIndexChanged = createEvent<number>();
export const authModalOpened = createEvent<void>();
export const authModalClosed = createEvent<void>();

export const $currentTabIndex = createStore<number>(0).on(tabIndexChanged, (_, index) => index);
export const $isAuthModalOpen = createStore<boolean>(false)
  .on(authModalOpened, () => true)
  .on(authModalClosed, () => false);

loadSessionWithTokenFx.doneData.watch(() => authModalClosed());

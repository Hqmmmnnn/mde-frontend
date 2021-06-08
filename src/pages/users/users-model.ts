import { attach, createEffect, createStore, createEvent } from "effector";
import { User, usersApi, UpdateUser } from "../../api/users";
import { $token } from "../../features/common/token-model";
import { getSelectedData } from "../create-and-edit-engine/common/model";

export const rolesSelectedData = getSelectedData();

const fetchUserFx = createEffect(usersApi.fetchUsers);
export const fetchUserWithTokenFx = attach({
  effect: fetchUserFx,
  source: $token,
  mapParams: (_: void, token: string | null) => ({ token }),
});

const updateUserFx = createEffect(usersApi.updateUser);
export const updateUserWithTokenFx = attach({
  effect: updateUserFx,
  source: $token,
  mapParams: (user: UpdateUser, token: string | null) => ({ user, token }),
});

export const toggleEditMode = createEvent<number>();

type UserWithEditMode = {
  user: User;
  isEditModeEnabled: boolean;
};

export const $users = createStore<UserWithEditMode[]>([])
  .on(fetchUserFx.doneData, (_, users) => users.map((user) => ({ user, isEditModeEnabled: false })))
  .on(toggleEditMode, (users, id) =>
    users.map((user, i) => {
      if (id === i) {
        return {
          ...user,
          isEditModeEnabled: !user.isEditModeEnabled,
        };
      }

      return user;
    })
  )
  .on(updateUserFx.done, (users, { params }) =>
    users.map((user) => {
      if (user.user.id === params.user.id) {
        return {
          user: {
            ...user.user,
            role: params.user.role,
          },
          isEditModeEnabled: false,
        } as UserWithEditMode;
      }

      return user;
    })
  );

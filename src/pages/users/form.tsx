import { Box, Typography, Button, IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import React, { FormEvent, useState } from "react";
import { User } from "../../api/users";
import { RoleSelect } from "./role-select";
import { useSnackbar } from "notistack";
import { toggleEditMode, updateUserWithTokenFx } from "./users-model";

type UserFormProps = {
  user: User;
  effListId: number;
};

export const UserForm = ({ user, effListId }: UserFormProps) => {
  const [role, setRole] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserWithTokenFx({ id: user.id, role })
      .then(() =>
        enqueueSnackbar("Информация о пользователе успешно обновлена", { variant: "success" })
      )
      .catch(() =>
        enqueueSnackbar("Не удалось обновить информацию о пользователе", { variant: "error" })
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box my={2}>
        <Typography variant="h5" align="center">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Typography color="textSecondary" align="center">
        {user.email}
      </Typography>

      <Box mt={2} style={{ display: "flex", justifyContent: "center" }}>
        <RoleSelect value={role} onChange={setRole} />
      </Box>

      <Box style={{ display: "flex", justifyContent: "center", width: "100% " }}>
        <Box mx={1} my={0.5}>
          <IconButton type="submit" color="primary">
            <DoneIcon />
          </IconButton>
        </Box>
        <Box mx={1} my={0.5}>
          <IconButton onClick={() => toggleEditMode(effListId)} color="secondary">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
};

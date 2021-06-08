import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useList } from "effector-react";
import { useEffect } from "react";
import { User } from "../../api/users";
import { Header } from "../../features/common/header";
import { mapRole } from "../../lib/mapRole";
import { UserForm } from "./form";
import { toggleEditMode, $users, fetchUserWithTokenFx } from "./users-model";

export const UsersPage = () => {
  useEffect(() => {
    fetchUserWithTokenFx();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box p={1.5} style={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={2}>
            <UsersList />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

const UsersList = () =>
  useList($users, ({ user, isEditModeEnabled }, id) => {
    const userContent = isEditModeEnabled ? (
      <UserForm user={user} effListId={id} />
    ) : (
      <GeneralContent user={user} effListId={id} />
    );

    return (
      <Grid item>
        <Card
          key={user.id}
          style={{
            minWidth: "310px",
            borderRadius: "16px",
            padding: "8px",
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {userContent}
        </Card>
      </Grid>
    );
  });

type GeneralContentProps = {
  user: User;
  effListId: number;
};

const GeneralContent = ({ user, effListId }: GeneralContentProps) => (
  <>
    <CardContent>
      <Box my={2}>
        <Typography variant="h5" align="center">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Typography color="textSecondary" align="center">
        {user.email}
      </Typography>
      <Typography color="textSecondary" align="center">
        {mapRole(user.role)}
      </Typography>
    </CardContent>
    <CardActions style={{ padding: "4px" }}>
      <Box style={{ display: "flex", justifyContent: "center", width: "100% " }}>
        <IconButton onClick={() => toggleEditMode(effListId)} color="primary">
          <EditIcon />
        </IconButton>
      </Box>
    </CardActions>
  </>
);

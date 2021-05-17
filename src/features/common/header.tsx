import {
  AppBar,
  Button,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStore } from "effector-react";
import React from "react";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { AuthTabs } from "../../auth/auth";
import { tabIndexChanged, authModalOpened } from "../../auth/auth-model";
import { $session, $isAuthenticated, sessionDropped } from "./session/session-model";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    item: {
      marginRight: theme.spacing(2),
    },
  })
);

const handleOpenAuthModal = (index: number) => {
  return (_: any) => {
    tabIndexChanged(index);
    authModalOpened();
  };
};

export const Header = () => {
  const classes = useStyles();
  const currentUser = useStore($session);
  const isAuthenticated = useStore($isAuthenticated);

  return (
    <React.Fragment>
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Морские дизельные двигатели
          </Typography>
          {isAuthenticated ? (
            <>
              {currentUser?.role === "ADMIN" && (
                <Link
                  color="inherit"
                  className={classes.item}
                  component={RouterLink}
                  to="/createEngine"
                >
                  Добавление двигателя
                </Link>
              )}
              <AccountCircleOutlinedIcon className={classes.item} />
              <div className={classes.item}>
                <Typography>
                  {currentUser?.firstName} {currentUser?.lastName}
                </Typography>
              </div>

              <Button color="inherit" className={classes.item} onClick={() => sessionDropped()}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleOpenAuthModal(0)}
                color="inherit"
                variant="outlined"
                className={classes.item}
              >
                Войти
              </Button>
              <Button
                onClick={handleOpenAuthModal(1)}
                color="inherit"
                variant="outlined"
                className={classes.item}
              >
                Зарегистрироваться
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <AuthTabs />
    </React.Fragment>
  );
};

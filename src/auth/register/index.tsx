import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "effector-forms/dist";
import { useStore } from "effector-react";
import { FormEvent, useState } from "react";
import { $registerResponseFromServer, registerForm, registerUserFx } from "./model";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    padding: "2rem",
    width: "42rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textField: {
    marginTop: "2rem",
    width: "100%",
  },
  button: {
    marginTop: "2rem",
  },
});

export const RegisterTab = () => {
  const { fields, submit, eachValid } = useForm(registerForm);
  const responseFromServer = useStore($registerResponseFromServer);
  const [showPassword, setShowPassword] = useState(false);
  const pending = useStore(registerUserFx.pending);
  const classes = useStyles();

  const onSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <Typography variant="h5" component="h4" align="center">
          Регистрация
        </Typography>
        <form onSubmit={onSumbit}>
          <TextField
            className={classes.textField}
            id="email"
            label="Почта"
            variant="outlined"
            size="small"
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
          />
          <Typography color="error" component="p">
            {fields.email.errorText({
              email: "Введите корректный email",
            })}
          </Typography>

          <FormControl className={classes.textField} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              autoComplete="false"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={fields.password.value}
              onChange={(e) => fields.password.onChange(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Typography color="error" component="p">
            {fields.password.errorText({
              required: "Поле пароль не должно быть пустым",
            })}
          </Typography>

          <TextField
            className={classes.textField}
            id="firstName"
            label="Имя"
            variant="outlined"
            size="small"
            value={fields.firstName.value}
            onChange={(e) => fields.firstName.onChange(e.target.value)}
          />

          <TextField
            className={classes.textField}
            id="lastName"
            label="Фамилия"
            variant="outlined"
            size="small"
            value={fields.lastName.value}
            onChange={(e) => fields.lastName.onChange(e.target.value)}
          />

          <Button
            className={classes.button}
            color="primary"
            variant="outlined"
            type="submit"
            fullWidth
            disabled={!eachValid || pending}
          >
            Зарегистироваться
          </Button>

          {responseFromServer && (
            <Box mt={1.5}>
              <Typography color="error" component="p" align="center">
                responseFromServer
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </div>
  );
};

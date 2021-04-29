import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "effector-forms/dist";
import { useStore } from "effector-react";
import { FormEvent, useState } from "react";
import { $loginErrorFromServer, loginForm, loginUserFx } from "./model";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "0 0 15px 15px",
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

export const LoginModal = () => {
  const classes = useStyles();
  const { fields, submit, eachValid } = useForm(loginForm);
  const errorFromServer = useStore($loginErrorFromServer);
  const [showPassword, setShowPassword] = useState(false);
  const pending = useStore(loginUserFx.pending);

  const onSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const isTextFieldsNotTouchedOrFieldsNotValid =
    !fields.email.isTouched || !fields.password.isTouched || !eachValid;

  return (
    <div className={classes.card}>
      <Typography variant="h5" component="h4" align="center">
        Вход
      </Typography>

      <form onSubmit={onSumbit} className={classes.form}>
        <TextField
          className={classes.textField}
          id="email"
          label="Почта"
          variant="outlined"
          size="small"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
        />

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

        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          type="submit"
          fullWidth
          disabled={isTextFieldsNotTouchedOrFieldsNotValid || pending}
        >
          Войти
        </Button>

        {errorFromServer && (
          <Typography color="error" component="p" align="center">
            {errorFromServer}
          </Typography>
        )}
      </form>
    </div>
  );
};

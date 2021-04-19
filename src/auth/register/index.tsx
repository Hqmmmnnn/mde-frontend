import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm } from "effector-forms/dist";
import { useStore } from "effector-react";
import { FormEvent } from "react";
import {
  $registerResponseFromServer,
  registerForm,
  registerUserFx,
} from "./model";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  textField: {
    marginBottom: "16px",
  },
});

export const RegisterPage = () => {
  const { fields, submit, eachValid } = useForm(registerForm);
  const responseFromServer = useStore($registerResponseFromServer);
  const pending = useStore(registerUserFx.pending);
  const classes = useStyles();

  const onSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Card className={classes.root}>
      <Typography gutterBottom variant="h4" component="h2" align="center">
        signup
      </Typography>
      <form onSubmit={onSumbit}>
        <TextField
          className={classes.textField}
          id="email"
          label="Почта"
          variant="outlined"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
        />
        <div>
          {fields.email.errorText({
            email: "Введите корректный email",
          })}
        </div>
        <TextField
          className={classes.textField}
          id="password"
          label="Пароль"
          variant="outlined"
          type="password"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
        />
        <div>
          {fields.password.errorText({
            required: "Поле пароль не должно быть пустым",
          })}
        </div>
        <TextField
          className={classes.textField}
          id="firstName"
          label="Имя"
          variant="outlined"
          value={fields.firstName.value}
          onChange={(e) => fields.firstName.onChange(e.target.value)}
        />
        <TextField
          className={classes.textField}
          id="lastName"
          label="Фамилия"
          variant="outlined"
          value={fields.lastName.value}
          onChange={(e) => fields.lastName.onChange(e.target.value)}
        />
        <Button
          color="primary"
          variant="outlined"
          type="submit"
          disabled={!eachValid || pending}
        >
          Зарегистироваться
        </Button>
        {responseFromServer && <div>responseFromServer</div>}
      </form>
    </Card>
  );
};

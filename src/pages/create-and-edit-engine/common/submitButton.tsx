import { Button } from "@material-ui/core";

type SubmitButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const SubmitButton = ({ text, onClick }: SubmitButtonProps) => (
  <Button size="large" color="primary" variant="outlined" type="submit" onClick={onClick}>
    {text}
  </Button>
);

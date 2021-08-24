import { Button } from "@material-ui/core";

export const SignOut = ({ onSignOut }) => {
  return (
    <Button onClick={() => onSignOut()}>
      Sign Out
    </Button>
  );
};

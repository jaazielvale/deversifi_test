import { AppBar, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/auth";
import { SignOut } from "./SignOut";

export const Header = () => {
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("signature");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SignOut onSignOut={() => signout()} />
      </Toolbar>
    </AppBar>
  );
};

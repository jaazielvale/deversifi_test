import { Card, Container, Typography } from "@material-ui/core";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import {
  Redirect
} from "react-router-dom";

import { setUser } from "../store/reducers/auth";
import { SignIn } from "./SignIn";

export const Auth = () => {
  const dispatch = useDispatch();
  const { account, connect } = useMetaMask();
  const user = useSelector((state) => state.auth.user);

  const login = () => {
    connect();
  };

  useEffect(() => {
    const handleSignMessage = async () => {
      const web3 = new Web3(Web3.givenProvider);

      try {
        const signature = await web3.eth.personal.sign(
          'AUTH',
          account,
          ""
        );
        return signature;
      } catch (err) {
        throw new Error("You need to sign the message to be able to log in.");
      }
    };

    if (!account) {
      dispatch(setUser(null));
    } else {
      const signature = localStorage.getItem("signature");

      if (signature) {
        return dispatch(
          setUser({
            address: account,
            signature,
          })
        );
      }
      handleSignMessage()
        .then((signature) => {
          localStorage.setItem("signature", signature);
          dispatch(
            setUser({
              address: account,
              signature,
            })
          );
        })
        .catch((err) => {
          console.error(err);
          dispatch(setUser(null));
        });
    }
  }, [dispatch, account]);

  return (
    <Container maxWidth="md" style={{ padding: "10vh 0" }}>
      <Card style={{ padding: 24, textAlign: "left" }}>
        {user && user.signature ? (
          <>
            <Redirect push to="/trading" />
          </>
        ) : (
          <>
            <Typography variant="h6">MetaMask Login</Typography>
            <SignIn onLoggedIn={() => login()} />
          </>
        )}
      </Card>
    </Container>
  );
};

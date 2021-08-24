import { Container, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import {
  deposit,
  getBalances,
  getOrders,
  placeOrder,
  cancelOrder,
} from "../api/trading";
import { Deposit } from "../components/Deposit";
import { Order } from "../components/Order";
import { Header } from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const TradingView = () => {
  const classes = useStyles();
  const [balances, setBalances] = useState([]);
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const fetchBalances = () => {
    getBalances().then(({ balances: items }) => {
      setBalances(items);
    });
  };

  const fetchOrders = () => {
    getOrders().then(({ orders: items }) => {
      setOrders(items);
    });
  };

  const showAlert = (alertContent, alertClass) => {
    setAlertContent(alertContent);
    setAlertClass(alertClass);
    setAlert(true);
  };

  const onCreateDeposit = (token, amount) => {
    if (!token || !amount) {
      return;
    }
    const data = {
      token,
      amount,
    };
    deposit(data).then(() => {
      fetchBalances();
      showAlert("Deposited " + amount + " " + token, "success");
    });
  };

  const onCancelOrder = (id) => {
    const data = {
      id,
    };
    cancelOrder(data).then(() => {
      fetchOrders();
      fetchBalances();
      showAlert("Cancelled Order. ID: " + id, "success");
    });
  };

  const onCreateOrder = (token, amount, side, price) => {
    if (!token || !amount || !side || !price) {
      return;
    }
    const data = {
      token,
      amount,
      side,
      price,
    };
    placeOrder(data)
      .then(({ data }) => {
        fetchOrders();
        fetchBalances();
        showAlert("Placed Order. ID: " + data.id, "success");
      })
      .catch((e) => {
        showAlert(e.response.data.error, "error");
      });
  };

  useEffect(() => {
    fetchBalances();
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ padding: "10vh 0" }}>
        <div className={classes.alert}>
          {alert ? (
            <Snackbar
              style={{ height: "100%" }}
              open={alert}
              autoHideDuration={3000}
              onClose={() => setAlert(false)}
            >
              <Alert severity={alertClass}>{alertContent}</Alert>
            </Snackbar>
          ) : (
            <></>
          )}
        </div>
        <Deposit balances={balances} onCreate={onCreateDeposit} />
        <Order
          orders={orders}
          onCreate={onCreateOrder}
          onCancel={onCancelOrder}
        />
      </Container>
    </>
  );
};

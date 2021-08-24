import { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Card,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Order = ({ orders, onCreate, onCancel }) => {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("");
  const [price, setPrice] = useState("");

  const handleChangeTokenSelect = (event) => {
    setToken(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleChangeSide = (event) => {
    setSide(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Card style={{ padding: 24, marginBottom: 24, textAlign: "left" }}>
      <Typography variant="h6">Order</Typography>
      <Grid style={{ marginTop: 24 }}>
        <FormControl className={classes.formControl}>
          <InputLabel>Side</InputLabel>
          <Select
            id="order-side-select"
            value={side}
            onChange={handleChangeSide}
          >
            <MenuItem value={"BUY"}>BUY</MenuItem>
            <MenuItem value={"SELL"}>SELL</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Tokens</InputLabel>
          <Select
            id="order-token-select"
            value={token}
            onChange={handleChangeTokenSelect}
          >
            <MenuItem value={"ETH"}>ETH</MenuItem>
            <MenuItem value={"USDT"}>USDT</MenuItem>
            <MenuItem value={"DVF"}>DVF</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            onChange={handleChangeAmount}
            id="order-token-amount"
            label="AMOUNT"
            type={"number"}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            onChange={handleChangePrice}
            id="order-price"
            label="PRICE"
            type={"number"}
          />
        </FormControl>
      </Grid>
      <Grid style={{ marginTop: 24, marginBottom: 24 }}>
        <Button
          variant="contained"
          onClick={() => onCreate(token, amount, side, price)}
        >
          Submit
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Side</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.side}</TableCell>
                <TableCell>{item.token}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => onCancel(item.id)}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

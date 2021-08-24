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
  table: {
    minWidth: 650,
  },
}));

export const Deposit = ({ balances, onCreate }) => {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");

  const handleChangeTokenSelect = (event) => {
    setToken(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Card style={{ padding: 24, marginBottom: 24, textAlign: "left" }}>
      <Typography variant="h6">Deposit</Typography>
      <Grid style={{ marginTop: 24 }}>
        <FormControl className={classes.formControl}>
          <InputLabel>Tokens</InputLabel>
          <Select
            id="deposit-token-select"
            value={token}
            onChange={handleChangeTokenSelect}
            required
          >
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
            <MenuItem value="DVF">DVF</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="deposit-token-amount"
            label="AMOUNT"
            onChange={handleChangeAmount}
            type={"number"}
          />
        </FormControl>
      </Grid>
      <Grid style={{ marginTop: 24, marginBottom: 24 }}>
        <Button variant="contained" onClick={() => onCreate(token, amount)}>
          Submit
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map((item) => (
              <TableRow key={item.token}>
                <TableCell>{item.token}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

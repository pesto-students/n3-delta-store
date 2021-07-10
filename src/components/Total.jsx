import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TAX_RATE = 0.18;
const shippingCost = 40;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      margin: "12px 0px",
      marginTop: "100px",
    },
    cell: {
      fontSize: 16,
    },
    lastRow: {
      outline: "2px solid gray",
      backgroundColor: theme.palette.secondary.dark,
    },
    lastCell: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.palette.primary.contrastText,
    },
  };
});

const Total = () => {
  const classes = useStyles();
  const authState = useSelector((state) => state?.authReducer);
  const cartInfo = useSelector((state) => state?.cart);
  const { cart, total: cartTotal } = cartInfo;
  const currency = cart?.currency?.symbol;
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 40,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const shipping = cartTotal ? shippingCost : 0;
    const tax = (cartTotal + shipping) * TAX_RATE;
    const total = cartTotal + shipping + tax;
    setSummary({
      ...summary,
      shipping,
      subtotal: cartTotal,
      tax,
      total,
    });
  }, [cart]);
  return (
    <TableContainer component={Paper} className={classes.root} position="fixed">
      <Table className={classes.table} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell} colSpan={2}>
              Subtotal
            </TableCell>
            <TableCell className={classes.cell} align="right">
              {` ${currency}`}
              {summary.subtotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell} colSpan={2}>
              Shipping
            </TableCell>
            <TableCell className={classes.cell} align="right">
              {` ${currency}`}&nbsp;
              {summary.shipping}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell} colSpan={2}>
              Tax({`${(TAX_RATE * 100).toFixed(0)} %`})
            </TableCell>
            <TableCell className={classes.cell} align="right">
              {` ${currency}`}&nbsp;
              {summary?.tax.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className={classes.lastRow}>
            <TableCell className={classes.lastCell} colSpan={2}>
              <h3>Total</h3>
            </TableCell>
            <TableCell className={classes.lastCell} align="right">
              <h3>
                {` ${currency}`}&nbsp;
                {summary?.total}
              </h3>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Total;

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

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "12px 0px",
    marginTop:'100px'
  },
  cell: {
    fontSize: 16,
  },
});

const Total = () => {
  const classes = useStyles();
  const authState = useSelector((state) => state?.authReducer);
  const cartInfo = useSelector((state) => state?.cart);
  const { cart, total:cartTotal } = cartInfo;
  const currency = cart?.currency?.code;
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 40,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const shipping = cartTotal ? shippingCost : 0;
    const tax = ((cartTotal + shipping) * TAX_RATE);
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
              {summary.subtotal}
              {` ${currency}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell} colSpan={2}>
              Shipping
            </TableCell>
            <TableCell className={classes.cell} align="right">
              {summary.shipping}
              {` ${currency}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>Tax</TableCell>
            <TableCell className={classes.cell} align="right">{`${(
              TAX_RATE * 100
            ).toFixed(0)} %`}</TableCell>
            <TableCell className={classes.cell} align="right">
              {summary?.tax.toFixed(2)}
              {` ${currency}`}
            </TableCell>
          </TableRow>
          <TableRow style={{backgroundColor:'green'}}>
            <TableCell className={classes.cell} colSpan={2}>
              <h3>Total</h3>
            </TableCell>
            <TableCell className={classes.cell} align="right" >
              <h3>
                {summary?.total}
                {` ${currency}`}
              </h3>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Total;

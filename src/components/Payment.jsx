import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../main/store/actions/LoginModalActions";

const useStyles = makeStyles((theme) => ({
  paymentButton: {
    marginTop: theme.spacing(1),
  },
}));

const Payment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.authReducer);
  const { isLoggedIn } = authState;

  const [isProcessing, setIsProcessing] = useState(false);

  const onPaymentCompletion = () => {
    // add the order to my orders of profile page
    // empty the cart, create new cart from commerce and assign
    // some modal to be shown
  };

  const startPaymentProcess = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentCompletion();
    }, 2500);
  };

  return (
    <div>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="payment method"
            name="payment method"
            defaultValue="Razorpay"
          >
            <FormControlLabel
              value="Razorpay"
              control={<Radio />}
              label="Razorpay"
            />
            <FormControlLabel
              value="Paypal"
              disabled
              control={<Radio />}
              label="Paypal"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <br />
      <Button
        className={classes.paymentButton}
        disabled={isProcessing}
        size="large"
        variant="contained"
        color="primary"
        // onClick={startPaymentProcess}
      >
        {isProcessing ? "Please wait.." : "Proceed to Pay"}
      </Button>
    </div>
  );
};

export default Payment;

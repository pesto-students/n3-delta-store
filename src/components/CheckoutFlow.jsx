import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import EmptyCart from "./EmptyCart";
import Payment from "./Payment";
import AddressSelection from "./AddressSelection";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "12px 0px",
    padding: 0,
    paddingTop: "24px",
    background: "#0000",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  actionDivider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const steps = [
  "Shopping Cart",
  "Select Delivery Address",
  "Select Payment Method",
];

const CheckoutFlow = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const addressesCount =
    useSelector((state) => state?.addressInfo?.addresses?.length) || 0;
  const cart = useSelector((state) => state?.cart);
  const { items, cartLength, total } = cart;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            {items.length ? (
              items.map((product) => (
                <CheckoutItem
                  key={`${product.id}`}
                  product={product}
                />
              ))
            ) : (
              <EmptyCart />
            )}
          </>
        );
      case 1:
        return <AddressSelection />;
      case 2:
        return <Payment />;

      default:
        return "Unknown step";
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper
        className={classes.root}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <Divider className={classes.actionDivider} />
              <div className={classes.actionsContainer}>
                {steps[activeStep + 1] ? (
                  <Button
                    disabled={
                      !items.length || (!addressesCount && activeStep === 1)
                    }
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Continue
                  </Button>
                ) : null}
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutFlow;

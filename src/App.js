import React, { Suspense } from "react";
import Routes from "./main/routes/route";
import "./resources/styles/reset.scss";
import { CircularProgress, ThemeProvider } from "@material-ui/core";
import theme from "./resources/styles/theme";
import GlobalError from "./components/GlobalError";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress color="primary" />}>
        <Routes />
        <GlobalError />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

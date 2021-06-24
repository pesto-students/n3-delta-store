import { CircularProgress, ThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';

import Routes from './main/routes/route';
import './resources/styles/reset.scss'
import theme from './resources/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Suspense fallback={<CircularProgress color='primary' />}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

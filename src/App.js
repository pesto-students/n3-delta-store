import React, { Suspense } from 'react';

import Routes from './main/routes/route';
import './resources/styles/reset.scss'

function App() {
  return (
    <Suspense fallback={<div>Please Wait...</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;

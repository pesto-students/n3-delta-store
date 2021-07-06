import "./resources/styles/reset.scss";
import store from './main/store/store'
import { Provider } from 'react-redux'
import AppMain from "./AppMain";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <AppMain />
      </Router>
    </Provider>
  );
}


export default App;

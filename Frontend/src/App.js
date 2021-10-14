import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.module.scss';

import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

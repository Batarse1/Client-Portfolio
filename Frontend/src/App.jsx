import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./Hooks/UseAuth/useAuth";

import Login from "./Pages/Login/Login";
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound';
import Home from "./Pages/Home/Home";

import PrivateRoute from "./HOCs/PrivateRoute/PrivateRoute";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/Home" component={Home}/>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";
import { TradingView } from "./containers/TradingView";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

function App() {
  const auth = useSelector(state => state.auth.user && state.auth.user.signature);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute authed={!!auth} path='/trading' component={TradingView} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

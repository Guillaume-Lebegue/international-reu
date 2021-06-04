import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import PrivateRoute from './components/utils/PrivateRoute';

import Home from './components/Home/Home';
import Login from './components/Login/Login';

import { UserContext, useUserContext } from './contexts/User.context';

function App(): JSX.Element {
  const userContext = useUserContext();
  return (
    <div className='container d-flex flex-column' style={{minHeight: '100vh'}}>
      <UserContext.Provider value={userContext}>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <PrivateRoute path="/" exact>
              <Home />
            </PrivateRoute>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

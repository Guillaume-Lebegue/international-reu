import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../../contexts/User.context';

export default function PrivateRoute(routeProps: RouteProps): JSX.Element {
  const userContext = useContext(UserContext);

  if (userContext.isAuth && !!userContext.loggedUser)
    return <Route {...routeProps} />;
  else
    return <Redirect to="/login" />;
}

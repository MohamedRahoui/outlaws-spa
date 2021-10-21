import { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { hasStaff } from '../helpers/user';
import { store } from '../store';
import Routes from './routes';
import ScrollToTop from '../helpers/scrollTop';

// FIXME:: Clean up this code once stable
const StaffRoute = ({ children, ...rest }: any) => {
  const snap = useSnapshot(store);
  const staff = hasStaff(snap.user);
  return (
    <Route
      {...rest}
      render={() =>
        staff ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};
const AuthRoute = ({ children, ...rest }: any) => {
  const snap = useSnapshot(store);
  return (
    <Route
      {...rest}
      render={() =>
        snap.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};
const OfflineRoute = ({ children, ...rest }: any) => {
  const snap = useSnapshot(store);
  return (
    <Route
      {...rest}
      render={() =>
        !snap.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};
const RouterComponent = () => (
  <Fragment>
    <ScrollToTop />
    <Switch>
      {Routes.map((route, i) => {
        if (route.staff) {
          return (
            <StaffRoute exact path={route.path} key={i + 1}>
              <route.component />
            </StaffRoute>
          );
        } else if (route.auth) {
          return (
            <AuthRoute exact path={route.path} key={i + 1}>
              <route.component />
            </AuthRoute>
          );
        } else if (route.offline) {
          return (
            <OfflineRoute exact path={route.path} key={i + 1}>
              <route.component />
            </OfflineRoute>
          );
        } else {
          return (
            <Route exact path={route.path} key={i}>
              <route.component />
            </Route>
          );
        }
      })}
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  </Fragment>
);

export default RouterComponent;

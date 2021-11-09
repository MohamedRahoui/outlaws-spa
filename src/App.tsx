import { createTheme, ThemeProvider, Box, Toolbar } from '@mui/material';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import RouterComponent from './router';
import { ToastContainer } from 'react-toastify';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { store } from './store';
import { useSnapshot } from 'valtio';
import { checkLogin, hasStaff } from './helpers/user';
import StaffHeader from './components/staff/header/header';
import StaffDrawer from './components/staff/drawer/drawer';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { injectStyle } from 'react-toastify/dist/inject-style';
let theme = createTheme({
  palette: {
    primary: {
      main: '#f31800',
    },
    success: {
      main: '#5cb85c',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
    },
    mode: 'dark',
    secondary: {
      main: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});
let staffTheme = createTheme({
  palette: {
    primary: {
      main: '#f31800',
    },
    success: {
      main: '#5cb85c',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});
function App() {
  const location = useLocation();
  const staffPage = useRouteMatch({
    path: '/staff',
  });
  const snap = useSnapshot(store);
  useEffect(() => {
    injectStyle();
  }, []);
  useEffect(() => {
    checkLogin(snap);
    if (import.meta.env.VITE_GOOGLE_ANALYTICS) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [location]);
  if (hasStaff(snap.user) && staffPage)
    return (
      <ThemeProvider theme={staffTheme}>
        <Box sx={{ display: 'flex' }}>
          <StaffHeader />
          <StaffDrawer />
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <RouterComponent />
          </Box>
          <ToastContainer style={{ fontFamily: 'Lato, sans-serif' }} />
        </Box>
      </ThemeProvider>
    );
  return (
    <ThemeProvider theme={theme}>
      <div className='globalWrap'>
        <Header />
        <RouterComponent />
        <Footer />
        <ToastContainer style={{ fontFamily: 'Lato, sans-serif' }} />
      </div>
    </ThemeProvider>
  );
}

export default App;

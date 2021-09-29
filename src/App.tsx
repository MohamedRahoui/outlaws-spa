import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import RouterComponent from './router';
import { SnackbarProvider } from 'notistack';
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
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <div className='globalWrap'>
          <Header />
          <RouterComponent />
          <Footer />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

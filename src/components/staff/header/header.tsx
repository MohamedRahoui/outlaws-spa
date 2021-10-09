import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ST from './header.module.scss';
import { store } from '../../../store';
import { useHistory } from 'react-router-dom';

const StaffHeader = () => {
  const history = useHistory();
  return (
    <AppBar
      color='primary'
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar color='primary'>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          onClick={() => store.toggleMobileNav()}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
          className={ST.title}
          onClick={() => history.push('/staff')}
        >
          Moroccan Outlaws
        </Typography>
        <Button color='inherit' onClick={() => history.push('/')}>
          Fermer
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default StaffHeader;

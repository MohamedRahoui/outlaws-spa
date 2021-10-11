import {
  Drawer,
  Toolbar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import ST from './drawer.module.scss';
import { useSnapshot } from 'valtio';
import { store } from '../../../store';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Item = ({ path, label, Icon }: any) => {
  const history = useHistory();
  const linkClick = () => {
    history.push(path);
    store.toggleMobileNav();
  };
  return (
    <ListItem
      button
      selected={
        useRouteMatch({
          path,
        })?.isExact
      }
      onClick={linkClick}
    >
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

const DrawerContent = () => {
  const items = [
    {
      path: '/staff/petitions',
      label: 'Pétitions',
      Icon: <ListAltIcon />,
    },
    {
      path: '/staff/volunteers',
      label: 'Bénévoles',
      Icon: <VolunteerActivismIcon />,
    },
  ];
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {items.map((item, index) => (
          <Item
            key={index}
            path={item.path}
            label={item.label}
            Icon={item.Icon}
          />
        ))}
      </List>
    </Box>
  );
};
const drawerWidth = 240;

const StaffDrawer = () => {
  const snap = useSnapshot(store);
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        // container={container}
        variant='temporary'
        open={snap.mobileNavOpen}
        onClose={() => store.toggleMobileNav()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <DrawerContent />
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default StaffDrawer;

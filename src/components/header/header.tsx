import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router-dom';
import Outlaws from '../../../assets/img/outlaw.png';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../userAvatar/userAvatar';
import { useSnapshot } from 'valtio';
import store from '../../store';
import ST from './header.module.scss';
import classNames from 'classnames/bind';

const Header = () => {
  const history = useHistory();
  const isLoginPage = useRouteMatch({
    path: '/login',
  });

  const snap = useSnapshot(store);
  const cx = classNames.bind(ST);
  const menuItems = [
    {
      text: 'Accueil',
      path: '/',
    },
    {
      text: 'A propos',
      path: '/about-us',
    },
    {
      text: 'Pétition',
      path: '/petition',
    },
    {
      text: 'Témoignages',
      path: '/testimonies',
    },
    {
      text: 'Nous rejoindre',
      path: '/join-us',
    },
    {
      text: 'Vote4Love',
      path: '/vote4Love',
    },
  ];
  return (
    <div className={ST.header}>
      <img
        className={ST.logo}
        src={Outlaws}
        alt='Moroccan Outlaws'
        onClick={() => history.push('/')}
      />
      <div className={ST.menu}>
        {menuItems.map((item, i) => (
          <div
            className={cx('menuItem', {
              active: useRouteMatch({
                path: item.path,
              })?.isExact,
            })}
            key={i}
            onClick={() => history.push(item.path)}
          >
            {item.text}
          </div>
        ))}
      </div>
      {!snap.user && !isLoginPage && (
        <div className={ST.auth}>
          <Button variant='contained' onClick={() => history.push('/login')}>
            Connexion
          </Button>
        </div>
      )}
      {snap.user && !isLoginPage && <UserAvatar />}
    </div>
  );
};
export default Header;

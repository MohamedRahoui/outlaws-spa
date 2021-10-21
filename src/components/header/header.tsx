import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router-dom';
import Outlaws from '../../../assets/img/outlaw.png';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../userAvatar/userAvatar';
import { useSnapshot } from 'valtio';
import { store } from '../../store';
import ST from './header.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    {
      text: 'Nous contacter',
      path: '/contact-us',
    },
  ];
  return (
    <div className={ST.headerWrapper}>
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
      {!useRouteMatch({
        path: '/',
      })?.isExact && (
        <Button
          startIcon={<ArrowBackIcon />}
          color='secondary'
          size='small'
          variant='outlined'
          onClick={() => history.push('/')}
          className={ST.backHome}
        >
          Retourner vers l'accueil
        </Button>
      )}
    </div>
  );
};
export default Header;

import Home from '../pages/home/home';
import Login from '../pages/authentication/login';
import HomeStaff from '../pages/staff';
import Profile from '../pages/profile/profile';
import Petition from '../pages/petition/petition';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
    offline: true,
  },
  {
    path: '/profile',
    component: Profile,
    auth: true,
  },
  {
    path: '/petition',
    component: Petition,
  },
  {
    path: '/staff',
    component: HomeStaff,
    staff: true,
  },
];

import Home from '../pages/home/home';
import Login from '../pages/authentication/login';
import HomeStaff from '../pages/staff';
import Profile from '../pages/profile/profile';
import Petition from '../pages/petition/petition';
import Petitions from '../pages/staff/petitions/petitions';

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
    path: '/petition/:userId?',
    component: Petition,
  },
  {
    path: '/staff',
    component: HomeStaff,
    staff: true,
  },
  {
    path: '/staff/petitions',
    component: Petitions,
    staff: true,
  },
];

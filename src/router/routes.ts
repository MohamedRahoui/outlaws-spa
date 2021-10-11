import Home from '../pages/home/home';
import Login from '../pages/authentication/login';
import HomeStaff from '../pages/staff';
import Profile from '../pages/profile/profile';
import Petition from '../pages/petition/petition';
import Petitions from '../pages/staff/petitions/petitions';
import Volunteer from '../pages/joinUs/volunteer/volunteer';
import Volunteers from '../pages/staff/volunteers/volunteers';
import Trainee from '../pages/joinUs/trainee/trainee';
import JoinUs from '../pages/joinUs/joinUs';

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
    path: '/join-us',
    component: JoinUs,
  },
  {
    path: '/join-us/volunteer',
    component: Volunteer,
  },
  {
    path: '/join-us/trainee',
    component: Trainee,
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
  {
    path: '/staff/volunteers',
    component: Volunteers,
    staff: true,
  },
];

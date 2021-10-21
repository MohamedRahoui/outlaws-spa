import Home from '../pages/home/home';
import Login from '../pages/authentication/login';
import HomeStaff from '../pages/staff';
import Profile from '../pages/profile/profile';
import Petition from '../pages/petition/petition';
import Petitions from '../pages/staff/petitions/petitions';
import Volunteer from '../pages/joinUs/volunteer/volunteer';
import Volunteers from '../pages/staff/volunteers/volunteers';
import Trainee from '../pages/joinUs/trainee/trainee';
import Trainees from '../pages/staff/trainees/trainees';
import JoinUs from '../pages/joinUs/joinUs';
import ContactUs from '../pages/contact-us/contactUs';
import Messages from '../pages/staff/messages/messages';
import AboutUs from '../pages/aboutUs/aboutUs';

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
    path: '/about-us',
    component: AboutUs,
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
    path: '/contact-us',
    component: ContactUs,
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
  {
    path: '/staff/trainees',
    component: Trainees,
    staff: true,
  },
  {
    path: '/staff/messages',
    component: Messages,
    staff: true,
  },
];

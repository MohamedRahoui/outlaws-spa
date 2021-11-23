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
import Testimonies from '../pages/testimonies/testimonies';
import TestimoniesStaff from '../pages/staff/testimonies/testimonies';
import Vote4Love from '../pages/vote4love/vote4love';
import Votes from '../pages/staff/votes/votes';
import Member from '../pages/joinUs/member/member';
import Members from '../pages/staff/members/members';
import Orders from '../pages/staff/orders/orders';

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
    path: '/join-us/member',
    component: Member,
    auth: true,
  },
  {
    path: '/petition/:userId?',
    component: Petition,
  },
  {
    path: '/vote4love',
    component: Vote4Love,
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
    path: '/testimonies',
    component: Testimonies,
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
    path: '/staff/votes',
    component: Votes,
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
  {
    path: '/staff/orders',
    component: Orders,
    staff: true,
  },
  {
    path: '/staff/members',
    component: Members,
    staff: true,
  },
  {
    path: '/staff/testimonies',
    component: TestimoniesStaff,
    staff: true,
  },
];

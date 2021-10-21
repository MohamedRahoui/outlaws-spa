import { toast } from 'react-toastify';
import ILoginData from '../models/login';
import IUser from '../models/user';
import history from './history';

const getRefreshToken = () => {
  const outlawsData = localStorage.getItem('outlawsData') || '';
  if (!outlawsData) return null;
  return outlawsData;
};

const setToken = (outlaws: string) => {
  localStorage.setItem('outlaws', outlaws);
};

const getToken = () => {
  const outlaws = localStorage.getItem('outlaws') || '';
  const outlawsData = getRefreshToken();
  if (!outlaws || !outlawsData) return null;
  return outlaws;
};

const getUser = () => {
  if (!getToken()) return null;
  const user = JSON.parse(localStorage.getItem('user') || '') as IUser;
  if (!user || !user?.id) return null;
  return user;
};

const hasStaff = (user: IUser | null) => {
  if (!user) return false;
  return user.role === 'STAFF';
};

const logout = () => {
  localStorage.clear();
};

const login = (data: ILoginData) => {
  if (!data || !data.outlaws || !data.outlawsData || !data.user) return;
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('outlaws', data.outlaws);
  localStorage.setItem('outlawsData', data.outlawsData);
  localStorage.setItem(
    'loggedIn',
    (new Date().getTime() + 24 * 60 * 60000).toString()
  );
};

const checkLogin = async (snap: any) => {
  if (getToken()) {
    try {
      if (parseInt(localStorage.getItem('loggedIn') || '')) {
        const loggedIn = new Date(
          parseInt(localStorage.getItem('loggedIn') || '')
        );
        if (loggedIn <= new Date()) {
          snap.logout();
          history.push('/login');
          toast.info('Votre session a expiré, veuillez vous reconnecter');
        }
      }
    } catch (_) {}
  }
};
const userName = (user: IUser | null) => {
  if (!user) return '';
  return user.firstName || user.lastName || user.email || '';
};

const getFullNameEmail = (user: IUser | null) => {
  if (!user) return '';
  if (!user.firstName && !user.lastName) return user.email || '';
  return `${user.firstName} ${user.lastName}`;
};

export {
  getUser,
  hasStaff,
  logout,
  login,
  userName,
  getFullNameEmail,
  getToken,
  setToken,
  getRefreshToken,
  checkLogin,
};

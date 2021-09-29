import ILoginData from '../models/login';
import IUser from '../models/user';

const getToken = () => {
  const outlaws = localStorage.getItem('outlaws') || '';
  const outlawsData = localStorage.getItem('outlawsData') || '';
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

export { getUser, hasStaff, logout, login, userName, getFullNameEmail };

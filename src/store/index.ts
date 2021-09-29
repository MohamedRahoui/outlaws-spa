import { proxy } from 'valtio';
import { getUser, logout, login } from '../helpers/user';
import IStore from '../models/store';

const store = proxy<IStore>({
  user: getUser() || null,
  login: (data) => {
    login(data);
    store.user = getUser() || null;
  },
  logout: () => {
    logout();
    store.user = null;
  },
});

export default store;

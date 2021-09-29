import ILoginData from './login';
import IUser from './user';

interface IStore {
  user: IUser | null;
  // eslint-disable-next-line no-unused-vars
  login: (data: ILoginData) => void;
  logout: () => void;
}
export default IStore;

import { IPetition } from './data';
import ILoginData from './login';
import IUser from './user';

export interface IStore {
  user: IUser | null;
  login: (data: ILoginData) => void;
  logout: () => void;
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
}

export interface IPetitonStore {
  petitions: IPetition[];
  fetched: boolean;
  setPetitions: (petitions: IPetition[]) => void;
}

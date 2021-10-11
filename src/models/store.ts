import { IPetition, IVolunteer } from './data';
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

export interface IVolunteerStore {
  volunteers: IVolunteer[];
  fetched: boolean;
  setVolunteers: (volunteers: IVolunteer[]) => void;
}

import { IMessage, IPetition, IPoints, IReward, ITrainee, IVolunteer } from './data';
import ILoginData from './login';
import IUser from './user';

export interface IStore {
  user: IUser | null;
  login: (data: ILoginData) => void;
  logout: () => void;
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
  rewards: IReward[];
  setRewards: (rewards: IReward[]) => void;
  rewardsFetched: boolean;
  points: IPoints;
  setPoints: (points: IPoints) => void;
  pointsFetched: boolean;
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

export interface ITraineeStore {
  trainees: ITrainee[];
  fetched: boolean;
  setTrainees: (trainees: ITrainee[]) => void;
}

export interface IMessageStore {
  messages: IMessage[];
  fetched: boolean;
  setMessages: (messages: IMessage[]) => void;
}

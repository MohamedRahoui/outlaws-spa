import {
  IMember,
  IMessage,
  IOrder,
  IPetition,
  IPoints,
  IReward,
  ISubscription,
  ITestimony,
  ITrainee,
  IVolunteer,
  IVote,
} from './data';
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
  subscription: ISubscription;
  setSubscription: (subscription: ISubscription) => void;
  subscriptionFetched: boolean;
}

export interface IPetitonStore {
  petitions: IPetition[];
  fetched: boolean;
  setPetitions: (petitions: IPetition[]) => void;
}

export interface IMemberStore {
  members: IMember[];
  fetched: boolean;
  setMembers: (members: IMember[]) => void;
  activateSubscription: (
    id: IMember['id'],
    subscription: IMember['subscription']
  ) => void;
  cancelSubscription: (id: IMember['id']) => void;
}

export interface IVolunteerStore {
  volunteers: IVolunteer[];
  fetched: boolean;
  setVolunteers: (volunteers: IVolunteer[]) => void;
}

export interface IVoteStore {
  votes: IVote[];
  fetched: boolean;
  setVotes: (votes: IVote[]) => void;
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

export interface IOrderStore {
  orders: IOrder[];
  fetched: boolean;
  setOrders: (orders: IOrder[]) => void;
}

export interface ITestimonyStore {
  testimonies: ITestimony[];
  fetched: boolean;
  setTestimonies: (testimonies: ITestimony[]) => void;
}

export interface ITestimonyStorePublic extends ITestimonyStore {
  count: number;
  setCount: (count: number) => void;
}

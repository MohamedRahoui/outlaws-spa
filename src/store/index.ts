import { proxy } from 'valtio';
import { getUser, logout, login } from '../helpers/user';
import {
  IMessageStore,
  IPetitonStore,
  IStore,
  ITraineeStore,
  IVolunteerStore,
} from '../models/store';

const store = proxy<IStore>({
  mobileNavOpen: false,
  toggleMobileNav: () => {
    store.mobileNavOpen = !store.mobileNavOpen;
  },
  user: getUser() || null,
  login: (data) => {
    login(data);
    store.user = getUser() || null;
  },
  logout: () => {
    logout();
    store.user = null;
  },
  rewards: [],
  rewardsFetched: false,
  setRewards: (rewards) => {
    store.rewardsFetched = true;
    store.rewards = rewards;
  },
  points: {
    currentPoints: 0,
    petitionsInProgress: 0,
    validatedPetitions: 0,
  },
  pointsFetched: false,
  setPoints: (points) => {
    store.pointsFetched = true;
    store.points = points;
  },
});

const petitionsStore = proxy<IPetitonStore>({
  petitions: [],
  fetched: false,
  setPetitions: (petitions) => {
    petitionsStore.fetched = true;
    petitionsStore.petitions = petitions || [];
  },
});

const volunteersStore = proxy<IVolunteerStore>({
  volunteers: [],
  fetched: false,
  setVolunteers: (volunteers) => {
    volunteersStore.fetched = true;
    volunteersStore.volunteers = volunteers || [];
  },
});

const traineesStore = proxy<ITraineeStore>({
  trainees: [],
  fetched: false,
  setTrainees: (trainees) => {
    traineesStore.fetched = true;
    traineesStore.trainees = trainees || [];
  },
});

const messagesStore = proxy<IMessageStore>({
  messages: [],
  fetched: false,
  setMessages: (messages) => {
    messagesStore.fetched = true;
    messagesStore.messages = messages || [];
  },
});

export { store, petitionsStore, volunteersStore, traineesStore, messagesStore };

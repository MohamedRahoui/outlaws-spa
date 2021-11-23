import { proxy } from 'valtio';
import { getUser, logout, login } from '../helpers/user';
import {
  IMemberStore,
  IMessageStore,
  IOrderStore,
  IPetitonStore,
  IStore,
  ITestimonyStore,
  ITestimonyStorePublic,
  ITraineeStore,
  IVolunteerStore,
  IVoteStore,
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
    orders: [],
    isMember: false,
  },
  pointsFetched: false,
  setPoints: (points) => {
    store.pointsFetched = true;
    store.points = points;
  },
  subscription: {
    picture: '',
    expiry: '',
  },
  subscriptionFetched: false,
  setSubscription: (subscription) => {
    store.subscriptionFetched = true;
    store.subscription = subscription;
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

const membersStore = proxy<IMemberStore>({
  members: [],
  fetched: false,
  setMembers: (members) => {
    membersStore.fetched = true;
    membersStore.members = members || [];
  },
  activateSubscription: (id, subscription) => {
    const index = membersStore.members.findIndex((x) => x.id === id);
    if (index || index === 0) {
      if (membersStore.members[index])
        membersStore.members[index] = {
          ...membersStore.members[index],
          subscription,
        };
    }
  },
  cancelSubscription: (id) => {
    const index = membersStore.members.findIndex((x) => x.id === id);
    if (index || index === 0) {
      if (membersStore.members[index])
        membersStore.members[index] = {
          ...membersStore.members[index],
          subscription: null,
        };
    }
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

const votesStore = proxy<IVoteStore>({
  votes: [],
  fetched: false,
  setVotes: (votes) => {
    votesStore.fetched = true;
    votesStore.votes = votes || [];
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

const ordersStore = proxy<IOrderStore>({
  orders: [],
  fetched: false,
  setOrders: (orders) => {
    ordersStore.fetched = true;
    ordersStore.orders = orders || [];
  },
});

const testimoniesStore = proxy<ITestimonyStorePublic>({
  testimonies: [],
  fetched: false,
  setTestimonies: (testimonies) => {
    testimoniesStore.fetched = true;
    testimoniesStore.testimonies = testimonies || [];
  },
  count: 0,
  setCount: (count) => {
    testimoniesStore.count = count || 0;
  },
});
const testimoniesStaffStore = proxy<ITestimonyStore>({
  testimonies: [],
  fetched: false,
  setTestimonies: (testimonies) => {
    testimoniesStaffStore.fetched = true;
    testimoniesStaffStore.testimonies = testimonies || [];
  },
});

export {
  store,
  petitionsStore,
  volunteersStore,
  traineesStore,
  messagesStore,
  testimoniesStore,
  testimoniesStaffStore,
  votesStore,
  membersStore,
  ordersStore,
};

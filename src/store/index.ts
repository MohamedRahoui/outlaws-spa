import { proxy } from 'valtio';
import { getUser, logout, login } from '../helpers/user';
import { IPetitonStore, IStore, IVolunteerStore } from '../models/store';

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

export { store, petitionsStore, volunteersStore };

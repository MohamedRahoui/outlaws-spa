/**
 * Model Petition
 */

export type IPetition = {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  cin: string;
  electoral_number: string;
  email: string;
  valid: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Testimony
 */

export type ITestimony = {
  id: number;
  name: string | null;
  age: string | null;
  text: string;
  city: string | null;
  valid: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Message
 */

export type IMessage = {
  id: number;
  name: string;
  email: string;
  reason: string;
  message: string;
  phone: string;
  treated: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Volunteer
 */

export type IVolunteer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  help: string;
  expertise: string;
  qualifications: string;
  social: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Member
 */

export type IMember = {
  id: string
  name: string
  email: string
  phone: string
  birth: string
  address: string
  social: string | null
  subscription: Date | null
  valid: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
};

/**
 * Model Vote
 */

export type IVote = {
  id: number;
  name: string | null;
  age: string | null;
  gender: string | null;
  email: string | null;
  love: string | null;
  right: string | null;
  choice: string | null;
  recommendation: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Reward
 */

export type IReward = {
  id: number;
  code: string;
  price: number;
  archived: boolean;
};

export type IPoints = {
  validatedPetitions: number;
  petitionsInProgress: number;
  currentPoints: number;
};

export type ITrainee = {
  id: string
  name: string
  email: string
  phone: string
  birth: string
  address: string
  degree: string
  speciality: string
  availability: string
  letter: string
  social: string | null
  userId: string | null
  createdAt: Date
  updatedAt: Date
}
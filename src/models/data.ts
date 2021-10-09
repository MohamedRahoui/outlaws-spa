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
  id: number;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  social: string | null;
  files: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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

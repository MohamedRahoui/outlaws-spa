interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: 'USER' | 'STAFF';
}
export default IUser;

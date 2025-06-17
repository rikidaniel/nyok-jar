import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  password: string;
  registrationDate: Timestamp;
  fullName: string;
  phoneNumber: string;
  address: string;
  packagePrice: number;
  status: string;
  role: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

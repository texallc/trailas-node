import { Roles } from "../types";

export interface User {
  readonly id?: number;
  uid: string;
  readonly role: Roles;
  name: string;
  email: string;
  description: string;
  active: boolean;
  image: string;
  password?: string;
  rfc: string;
  phone: number;
  role: Roles;
}

export interface UserAdmin extends User {
}

export interface UserBuyer extends User {

}
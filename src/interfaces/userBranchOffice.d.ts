export interface UserBranchOffice {
  readonly id?: number;
  uid?: string;
  name: string;
  email: string;
  phone?: number;
  rfc?: string;
  description?: string;
  image?: string;
  active: boolean;
}
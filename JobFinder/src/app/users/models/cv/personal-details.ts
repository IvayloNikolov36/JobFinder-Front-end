import { BasicValueModel } from "../../../core/models";

export interface PersonalDetails {
  id: number;
  cvId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: BasicValueModel;
  birthdate: string;
  citizenShip: BasicValueModel;
  country: BasicValueModel;
  city: string;
}

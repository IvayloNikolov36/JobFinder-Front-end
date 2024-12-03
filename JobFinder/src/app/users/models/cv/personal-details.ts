import { BasicModel } from "../../../models";

export interface PersonalDetails {
  id: number;
  cvId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: BasicModel;
  birthdate: string;
  citizenship: BasicModel;
  country: BasicModel;
  city: string;
}

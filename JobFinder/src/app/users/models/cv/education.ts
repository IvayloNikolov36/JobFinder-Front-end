import { BasicModel } from "../../../models";

export interface Education {
  id: number;
  organization: string;
  fromDate: string;
  toDate: string;
  location: string;
  educationLevel: BasicModel;
  major: string;
  mainSubjects: string;
}

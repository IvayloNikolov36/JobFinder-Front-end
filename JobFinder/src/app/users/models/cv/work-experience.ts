import { BasicModel } from "../../../models";

export interface WorkExperience {
  id: number;
  fromDate: string;
  toDate: string;
  jobTitle: string;
  organization: string;
  businessSector: BasicModel;
  location: string;
  aditionalDetails: string;
}

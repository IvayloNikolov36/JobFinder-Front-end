import { BasicValueModel } from "../../../core/models";

export interface WorkExperience {
  id: number;
  cvId: string;
  fromDate: string;
  toDate: string;
  jobTitle: string;
  organization: string;
  businessSector: BasicValueModel;
  location: string;
  additionalDetails: string;
}

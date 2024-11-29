import { BasicValueModel } from "../../../core/models";

export interface Education {
  id: number;
  cvId: string;
  organization: string;
  fromDate: string;
  toDate: string;
  location: string;
  educationLevel: BasicValueModel;
  major: string;
  mainSubjects: string;
}

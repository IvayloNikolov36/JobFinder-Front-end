import {
  CourseSertificate,
  Education,
  LanguageInfoInput,
  PersonalDetails,
  SkillsInfo,
  WorkExperience
} from ".";

export interface CvListingData {
  id: string;
  name: string;
  createdOn: Date;
  personalDetails: PersonalDetails;
  languagesInfo: LanguageInfoInput[];
  workExperiences: WorkExperience[];
  educations: Education[];
  courseCertificates: CourseSertificate[];
  skills: SkillsInfo;
}

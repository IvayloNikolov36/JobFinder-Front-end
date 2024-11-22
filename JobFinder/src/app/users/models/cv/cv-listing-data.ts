import {
  CourseSertificate,
  Education,
  LanguageInfo,
  PersonalDetails,
  SkillsInfo,
  WorkExperience
} from ".";

export interface CvListingData {
  id: string;
  name: string;
  createdOn: Date;
  personalDetails: PersonalDetails;
  languagesInfo: LanguageInfo[];
  workExperiences: WorkExperience[];
  educations: Education[];
  courseCertificates: CourseSertificate[];
  skills: SkillsInfo;
}

import {
  CourseSertificate,
  Education,
  LanguageInfo,
  PersonalDetails,
  SkillsInfo,
  WorkExperience
} from ".";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalDetails: PersonalDetails;
  educations: Education[];
  workExperiences: WorkExperience[];
  languagesInfo: LanguageInfo[];
  skills: SkillsInfo;
  courseCertificates: CourseSertificate[];
}

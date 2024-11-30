import {
  CourseSertificate,
  Education,
  LanguageInfoInput,
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
  languagesInfo: LanguageInfoInput[];
  skills: SkillsInfo;
  courseCertificates: CourseSertificate[];
}

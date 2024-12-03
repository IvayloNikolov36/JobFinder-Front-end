import {
  CourseCertificate,
  Education,
  LanguageInfoInput,
  LanguageInfoOutput,
  PersonalDetails,
  PersonalDetailsOutput,
  SkillsInfo,
  WorkExperience
} from ".";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalDetails: PersonalDetailsOutput;
  educations: Education[];
  workExperiences: WorkExperience[];
  languagesInfo: LanguageInfoOutput[];
  skills: SkillsInfo;
  courseCertificates: CourseCertificate[];
}

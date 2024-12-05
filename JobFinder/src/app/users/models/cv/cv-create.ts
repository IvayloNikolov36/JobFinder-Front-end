import {
  CourseCertificate,
  EducationOutput,
  LanguageInfoOutput,
  PersonalDetailsOutput,
  SkillsInfo,
  WorkExperienceOutput
} from ".";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalDetails: PersonalDetailsOutput;
  educations: EducationOutput[];
  workExperiences: WorkExperienceOutput[];
  languagesInfo: LanguageInfoOutput[];
  skills: SkillsInfo;
  courseCertificates: CourseCertificate[];
}

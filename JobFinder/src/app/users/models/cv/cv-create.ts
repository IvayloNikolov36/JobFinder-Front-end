import {
  CourseCertificate,
  EducationOutput,
  LanguageInfoOutput,
  PersonalDetailsOutput,
  SkillsInfoOutput,
  WorkExperienceOutput
} from ".";

export interface CvCreate {
  name: string;
  pictureUrl: string;
  personalDetails: PersonalDetailsOutput;
  educations: EducationOutput[];
  workExperiences: WorkExperienceOutput[];
  languagesInfo: LanguageInfoOutput[];
  skills: SkillsInfoOutput;
  courseCertificates: CourseCertificate[];
}

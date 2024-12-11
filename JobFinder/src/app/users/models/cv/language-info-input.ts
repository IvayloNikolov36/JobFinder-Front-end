import { BasicModel } from "../../../models";

export interface LanguageInfoInput {
  id: number;
  curriculumVitaeId: string;
  languageType: BasicModel;
  comprehensionLevel: BasicModel;
  speakingLevel: BasicModel;
  writingLevel: BasicModel;
}

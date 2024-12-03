import { BasicModel } from "../../../models";

export interface LanguageInfoInput {
  id: number;
  cvId: string;
  languageType: BasicModel;
  comprehensionLevel: BasicModel;
  speakingLevel: BasicModel;
  writingLevel: BasicModel;
}

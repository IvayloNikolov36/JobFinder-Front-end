import { BasicModel } from "../../../models";

export interface LanguageInfoInput {
  id: number;
  languageType: BasicModel;
  comprehensionLevel: BasicModel;
  speakingLevel: BasicModel;
  writingLevel: BasicModel;
}

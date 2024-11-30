import { BasicValueModel } from "../../../core/models";

export interface LanguageInfo {
  id: number;
  cvId: string;
  languageType: BasicValueModel;
  comprehension: BasicValueModel;
  speaking: BasicValueModel;
  writing: BasicValueModel;
}

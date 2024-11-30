import { BasicValueModel } from "../../../core/models";

export interface LanguageInfoInput {
  id: number;
  cvId: string;
  languageType: BasicValueModel;
  comprehension: BasicValueModel;
  speaking: BasicValueModel;
  writing: BasicValueModel;
}

import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl + 'nomenclature';

export const getGenderOptionsUrl = (): string => route + '/gender';
export const getCountriesUrl = (): string => route + '/countries';
export const getCitizenshipsUrl = (): string => route + '/citizenships';
export const getBusinessSectorsUrl = (): string => route + '/business-sectors';
export const getJobCategoriesUrl = (): string => route + '/job-categories';
export const getJobEngagementsUrl = (): string => route + '/job-engagements';
export const getEducationLevelsUrl = (): string => route + '/education-levels';
export const getLanguageTypesUrl = (): string => route + '/language-types';
export const getLanguageLevelsUrl = (): string => route + '/language-levels';
export const getDrivingCategoriesUrl = (): string => route + '/driving-categories';

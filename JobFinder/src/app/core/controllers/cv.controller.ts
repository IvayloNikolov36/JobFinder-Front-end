import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getCvCoursesUrl = (): string => route + 'cvs/Courses';
export const getCvCourseId = (id: string) => getCvCoursesUrl() + `/${id}`;
export const getUpdateCvCourseUrl = (cvId: string) => getCvCoursesUrl() + `/${cvId}/update`;
export const getCvsUrl = (): string => route + 'cvs/all';
export const getCvData = (cvId: string) => route + `cvs/${cvId}`;
export const getCreateCvUrl = () => route + `cvs/create`;
export const getCvEducationsUrl = (): string => route + 'cvs/Educations';
export const getCvEducationsEditUrl = (cvId: string) => route + 'cvs/Educations' + `/${cvId}/update`;
export const getCvEducationLevels = (): string => getCvEducationsUrl() + '/levels';
export const getCvLanguagesUrl = (): string => route + 'cvs/Languages';
export const getUpdateLanguageInfoUrl = (cvId: string) => getCvLanguagesUrl() + `/${cvId}/update`;
export const getLanguageLevelsUrl = (): string => getCvLanguagesUrl() + '/levels';
export const getLanguageTypesUrl = (): string => getCvLanguagesUrl() + '/types';
export const getCvSkillsUrl = (): string => route + 'cvs/Skills';
export const getDrivingCategoriesUrl = (): string => getCvSkillsUrl() + '/driving-categories';
export const getCvPersonalDetailsUrl = (): string => route + 'cvs/PersonalDetails';
export const getCvCountriesUrl = (): string => getCvPersonalDetailsUrl() + '/countryTypes';
export const getCvWorkExperiencesUrl = (): string => route + 'cvs/WorkExperiences/businessSectors';
export const getCvWorkExperienceUrl = (id: string): string => getCvWorkExperiencesUrl() + `/${id}`;
export const getUpdateWorkExperienceInfoUrl = (cvId: string) => getCvWorkExperiencesUrl() + `/${cvId}/update`;
export const getCvBusinessSectorsUrl = (): string => getCvWorkExperiencesUrl() + '/businessSectors';

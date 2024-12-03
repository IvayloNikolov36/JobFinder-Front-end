import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getCvCoursesUrl = (): string => route + 'cvs/Courses';
export const getCvCourseId = (id: string) => getCvCoursesUrl() + `/${id}`;
export const getUpdateCvCourseUrl = (cvId: string) => getCvCoursesUrl() + `/${cvId}/update`;
export const getCvsUrl = (): string => route + 'cvs/all';
export const getCvData = (cvId: string) => route + `cvs/${cvId}`;
export const getCreateCvUrl = () => route + `cvs/create`;
export const getDeleteCvUrl = (id: string) => route + `cvs/delete/${id}`;
export const getCvEducationsUrl = (): string => route + 'cvs/Educations';
export const getCvEducationsEditUrl = (cvId: string) => route + 'cvs/Educations' + `/${cvId}/update`;
export const getCvLanguagesUrl = (): string => route + 'cvs/Languages';
export const getUpdateLanguageInfoUrl = (cvId: string) => getCvLanguagesUrl() + `/${cvId}/update`;
export const getCvSkillsUrl = (): string => route + 'cvs/Skills';
export const getUpdateCvSkillsUrl = (cvId: string) => getCvSkillsUrl() + `/${cvId}/update`;
export const getDrivingCategoriesUrl = (): string => getCvSkillsUrl() + '/driving-categories';
export const getCvPersonalDetailsUrl = (): string => route + 'cvs/PersonalDetails';
export const getCvPersonalDetailsUpdateUrl = (cvId: string): string => route + `cvs/PersonalDetails/${cvId}/update`;
export const getCvWorkExperienceUrl = (id: string): string => route + 'cvs/WorkExperiences' + `/${id}`;
export const getUpdateWorkExperienceInfoUrl = (cvId: string) => route + 'cvs/WorkExperiences' + `/${cvId}/update`;

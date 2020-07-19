import { CourseSertificate } from './../models/cv/course-sertificate';
import { SkillsInfo } from './../models/cv/SkillsInfo';
import { LanguageInfo } from './../models/cv/language-info';
import { Education } from './../models/cv/education';
import { WorkExperience } from './../models/cv/work-experience';
import { PersonalDetails } from './../models/cv/personal-details';
import { Observable } from 'rxjs';
import { CvCreate } from '../models/cv/cv-create';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectOptionsType } from '../models/common/select-options-type';
import { DrivingCategory } from '../models/cv/driving-category';

const baseUrl = 'https://localhost:44357/api/cvs/';
const createPersonalDetailsUrl = baseUrl + 'PersonalDetails';
const createWorkExperiencesUrl = baseUrl + 'WorkExperiences';
const createEducationsUrl = baseUrl + 'educations';
const createLanguagesUrl = baseUrl + 'languages';
const createSkillsUrl = baseUrl + 'skills';
const createCoursesUrl = baseUrl + 'courses';

const getCountriesUrl = baseUrl + 'PersonalDetails/countryTypes';
const getBusinessSectorsUrl = baseUrl + 'workExperiences/businessSectors';
const getEducationLevelsUrl = baseUrl + 'educations/levels';
const getLanguageLevelsUrl = baseUrl + 'languages/levels';
const getLanguageTypesUrl = baseUrl + 'languages/types';
const getDrivingCategoriesUrl = baseUrl + 'skills/drivingCategories';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  createCv(data: CvCreate): Observable<string> {
    return this.http.post<string>(baseUrl, data);
  }

  createPersonalDetails(cvId: string, data: PersonalDetails) {
    data.cvId = cvId;
    return this.http.post(createPersonalDetailsUrl, data);
  }

  createWorkExperiences(cvId: string, data: WorkExperience[]) {
    return this.http.post(createWorkExperiencesUrl + `/${cvId}`, data);
  }

  createEducations(cvId: string, data: Education[]) {
    return this.http.post(createEducationsUrl + `/${cvId}`, data);
  }

  createLanguages(cvId: string, data: LanguageInfo[]) {
    return this.http.post(createLanguagesUrl + `/${cvId}`, data);
  }

  createSkills(cvId: string, data: SkillsInfo) {
    data.cvId = cvId;
    return this.http.post(createSkillsUrl, data);
  }

  createCourses(cvId: string, data: CourseSertificate[]) {
    return this.http.post(createCoursesUrl + `/${cvId}`, data);
  }

  getCountries(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getCountriesUrl);
  }

  getBusinessSectors(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getBusinessSectorsUrl);
  }

  getEducationLevels(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getEducationLevelsUrl);
  }

  getLanguageLevels(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getLanguageLevelsUrl);
  }

  getLanguageTypes(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getLanguageTypesUrl);
  }

  getDrivingCategories(): Observable<DrivingCategory[]> {
    return this.http.get<DrivingCategory[]>(getDrivingCategoriesUrl);
  }

}

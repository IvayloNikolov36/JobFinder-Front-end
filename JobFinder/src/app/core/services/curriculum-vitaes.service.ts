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

const baseUrl = 'https://localhost:44357/api/cvs/';
const createCvUrl = baseUrl + 'create';

const createPersonalDetailsUrl = baseUrl + 'PersonalDetails/create';
const createWorkExperiencesUrl = baseUrl + 'WorkExperience/create';
const createEducationsUrl = baseUrl + 'education/create';
const createLanguagesUrl = baseUrl + 'languages/create';
const createSkillsUrl = baseUrl + 'skills/create';
const createCoursesUrl = baseUrl + 'courses/create';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  createCv(data: CvCreate): Observable<string> {
    return this.http.post<string>(createCvUrl, data);
  }

  createPersonalDetails(cvId: string, data: PersonalDetails) {
    data.cvId = cvId;
    return this.http.post(createPersonalDetailsUrl, data);
  }

  createWorkExperiences(cvId: string, data: WorkExperience) {
    data.cvId = cvId;
    return this.http.post(createWorkExperiencesUrl, data);
  }

  createEducations(cvId: string, data: Education) {
    data.cvId = cvId;
    return this.http.post(createEducationsUrl, data);
  }

  createLanguages(cvId: string, data: LanguageInfo) {
    data.cvId = cvId;
    return this.http.post(createLanguagesUrl, data);
  }

  createSkills(cvId: string, data: SkillsInfo) {
    data.cvId = cvId;
    return this.http.post(createSkillsUrl, data);
  }

  createCourses(cvId: string, data: CourseSertificate) {
    data.cvId = cvId;
    return this.http.post(createCoursesUrl, data);
  }

}

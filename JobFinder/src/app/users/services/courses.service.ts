import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseSertificate } from '../models/cv/course-certificat';
import { getCvCoursesUrl, getCvCourseId, getUpdateCvCourseUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: CourseSertificate[]) => this.http.post(getCvCourseId(cvId), data);

  update = (cvId: string, data: CourseSertificate[]) => this.http.put(getUpdateCvCourseUrl(cvId), data);

  get = (): Observable<CourseSertificate[]> => this.http.get<CourseSertificate[]>(getCvCoursesUrl());
}

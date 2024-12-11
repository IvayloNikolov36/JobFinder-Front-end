import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseCertificate } from '../models/cv/course-certificate';
import { getCvCoursesUrl, getCvCourseId, getUpdateCvCourseUrl } from '../../core/controllers';
import { UpdateResultModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: CourseCertificate[]) => this.http.post(getCvCourseId(cvId), data);

  update(cvId: string, data: CourseCertificate[]): Observable<UpdateResultModel> {
    return this.http.put<UpdateResultModel>(getUpdateCvCourseUrl(cvId), data);
  }

  get = (): Observable<CourseCertificate[]> => this.http.get<CourseCertificate[]>(getCvCoursesUrl());
}

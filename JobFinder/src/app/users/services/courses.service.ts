import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseCertificate } from '../models/cv/course-certificate';
import { getUpdateCvCourseUrl } from '../../core/controllers';
import { UpdateResultModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: CourseCertificate[]): Observable<UpdateResultModel> {
    return this.http.put<UpdateResultModel>(getUpdateCvCourseUrl(cvId), data);
  }
}

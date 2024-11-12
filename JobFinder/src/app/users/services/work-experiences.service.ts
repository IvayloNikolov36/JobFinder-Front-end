import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from '../models/cv/work-experience';
import { BasicValueModel } from '../../core/models';
import { getCvWorkExperiencesUrl, getCvWorkExperienceUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: WorkExperience[]): Observable<Object> {
    return this.http.post(getCvWorkExperiencesUrl + `/${cvId}`, data);
  }

  // TODO: check this method and all get methods in other services = the param is not used

  get = (cvId: string): Observable<WorkExperience[]> => this.http.get<WorkExperience[]>(getCvWorkExperienceUrl(cvId));

  getBusinessSectors(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getCvWorkExperiencesUrl());
  }
}

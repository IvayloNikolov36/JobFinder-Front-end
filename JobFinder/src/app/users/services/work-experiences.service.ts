import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicValueModel } from '../../core/models';
import { WorkExperience } from './../models/cv/';
import { Observable } from 'rxjs';
import {
  getCvWorkExperiencesUrl,
  getCvWorkExperienceUrl,
  getUpdateWorkExperienceInfoUrl
} from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: WorkExperience[]): Observable<Object> {
    return this.http.post(getCvWorkExperiencesUrl + `/${cvId}`, data);
  }

  // TODO: check this method and all get methods in other services = the param is not used

  get(cvId: string): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(getCvWorkExperienceUrl(cvId));
  }

  update(cvId: string, data: WorkExperience[]) {
    return this.http.put(getUpdateWorkExperienceInfoUrl(cvId), data);
  }

  getBusinessSectors(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getCvWorkExperiencesUrl());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicValueModel } from '../../core/models';
import { WorkExperience, WorkExperienceOutput } from './../models/cv/';
import { getCvWorkExperiencesUrl, getUpdateWorkExperienceInfoUrl } from '../../core/controllers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: WorkExperience[]): Observable<Object> {
    return this.http.post(getCvWorkExperiencesUrl + `/${cvId}`, data);
  }

  update(cvId: string, data: WorkExperienceOutput[]): Observable<Object> {
    return this.http.put(getUpdateWorkExperienceInfoUrl(cvId), data);
  }

  getBusinessSectors(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getCvWorkExperiencesUrl());
  }
}

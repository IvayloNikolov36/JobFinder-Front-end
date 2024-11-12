import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from '../models/cv/education';
import { BasicValueModel } from '../../core/models';
import { getCvEducationLevels, getCvEducationsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: Education[]) => this.http.post(getCvEducationsUrl() + `/${cvId}`, data);

  get = (): Observable<Education[]> => this.http.get<Education[]>(getCvEducationsUrl());

  getEducationLevels = (): Observable<BasicValueModel[]> => this.http.get<BasicValueModel[]>(getCvEducationLevels());
}

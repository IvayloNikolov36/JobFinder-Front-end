import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrivingCategory, SkillsInfo } from '../models/cv';
import { getCvSkillsUrl, getDrivingCategoriesUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: SkillsInfo): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(getCvSkillsUrl(), data);
  }

  get = (cvId: string): Observable<SkillsInfo> => {
    return this.http.get<SkillsInfo>(getCvSkillsUrl() + `/${cvId}`);
  }

  getDrivingCategories = (): Observable<DrivingCategory[]> => {
    return this.http.get<DrivingCategory[]>(getDrivingCategoriesUrl());
  }
}

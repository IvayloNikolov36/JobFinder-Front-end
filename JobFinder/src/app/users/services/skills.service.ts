import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrivingCategory, SkillsInfo } from '../models/cv';
import { getCvSkillsUrl, getDrivingCategoriesUrl, getUpdateCvSkillsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: SkillsInfo): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(getCvSkillsUrl(), data);
  }

  update(cvId: string, data: SkillsInfo): Observable<Object> {
    return this.http.put(getUpdateCvSkillsUrl(cvId), data);
  }

  getDrivingCategories = (): Observable<DrivingCategory[]> => {
    return this.http.get<DrivingCategory[]>(getDrivingCategoriesUrl());
  }
}

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillsInfo } from '../models/cv/skills-info';
import { DrivingCategory } from '../models/cv/driving-category';
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

  get = (cvId: string): Observable<SkillsInfo> => this.http.get<SkillsInfo>(getCvSkillsUrl() + `/${cvId}`);

  getDrivingCategories = (): Observable<DrivingCategory[]> => this.http.get<DrivingCategory[]>(getDrivingCategoriesUrl());
}

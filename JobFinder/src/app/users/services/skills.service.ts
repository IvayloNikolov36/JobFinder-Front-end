import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillsInfo } from '../models/cv/skills-info';
import { DrivingCategory } from '../models/cv/driving-category';


const baseUrl = 'https://localhost:44357/api/cvs/Skills';
const getDrivingCategoriesUrl = baseUrl + '/driving-categories';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: SkillsInfo): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(baseUrl, data);
  }

  get = (cvId: string): Observable<SkillsInfo> => this.http.get<SkillsInfo>(baseUrl);

  getDrivingCategories = (): Observable<DrivingCategory[]> => this.http.get<DrivingCategory[]>(getDrivingCategoriesUrl);
}

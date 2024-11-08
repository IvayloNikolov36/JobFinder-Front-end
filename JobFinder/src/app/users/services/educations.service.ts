import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from '../models/cv/education';
import { SelectOptionsType } from '../../models/select-options-type';


const baseUrl = 'https://localhost:44357/api/cvs/Educations';
const getEducationLevelsUrl = baseUrl + '/levels';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: Education[]) => this.http.post(baseUrl + `/${cvId}`, data);

  get = (cvId: string): Observable<Education[]> => this.http.get<Education[]>(baseUrl);

  getEducationLevels = (): Observable<SelectOptionsType[]> => this.http.get<SelectOptionsType[]>(getEducationLevelsUrl);
}

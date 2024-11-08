import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageInfo } from '../models/cv/language-info';
import { BasicValueModel } from '../../core/models';


const baseUrl = 'https://localhost:44357/api/cvs/Languages';
const getLanguageLevelsUrl = baseUrl + '/levels';
const getLanguageTypesUrl = baseUrl + '/types';

@Injectable({
  providedIn: 'root'
})
export class LanguagesInfoService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: LanguageInfo[]): Observable<Object> {
    return this.http.post(baseUrl + `/${cvId}`, data);
  }

  get(): Observable<LanguageInfo[]> {
    return this.http.get<LanguageInfo[]>(baseUrl);
  }

  getLanguageLevels(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getLanguageLevelsUrl);
  }

  getLanguageTypes(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getLanguageTypesUrl);
  }
}

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageInfo } from '../models/cv/language-info';
import { SelectOptionsType } from '../../models/select-options-type';


const baseUrl = 'https://localhost:44357/api/cvs/Languages';
const getLanguageLevelsUrl = baseUrl + '/levels';
const getLanguageTypesUrl = baseUrl + '/types';

@Injectable({
  providedIn: 'root'
})
export class LanguagesInfoService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: LanguageInfo[]) => this.http.post(baseUrl + `/${cvId}`, data);

  get(cvId: string): Observable<LanguageInfo[]> {
    return this.http.get<LanguageInfo[]>(baseUrl);
  }

  getLanguageLevels(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getLanguageLevelsUrl);
  }

  getLanguageTypes(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getLanguageTypesUrl);
  }
}

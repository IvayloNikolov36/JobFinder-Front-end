import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageInfo } from '../models/cv/language-info';
import { BasicValueModel } from '../../core/models';
import {
  getCvLanguagesUrl,
  getLanguageLevelsUrl,
  getLanguageTypesUrl,
  getUpdateLanguageInfoUrl
} from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class LanguagesInfoService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: LanguageInfo[]): Observable<Object> {
    return this.http.post(getCvLanguagesUrl() + `/${cvId}`, data);
  }

  get(): Observable<LanguageInfo[]> {
    return this.http.get<LanguageInfo[]>(getCvLanguagesUrl());
  }

  update(cvId: string, data: LanguageInfo[]) {
    return this.http.put(getUpdateLanguageInfoUrl(cvId), data);
  }

  getLanguageLevels(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getLanguageLevelsUrl());
  }

  getLanguageTypes(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getLanguageTypesUrl());
  }
}

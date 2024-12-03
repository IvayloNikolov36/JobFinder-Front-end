import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageInfoInput } from '../models/cv/language-info-input';
import { getCvLanguagesUrl, getUpdateLanguageInfoUrl } from '../../core/controllers';
import { LanguageInfoOutput } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class LanguagesInfoService {

  constructor(private http: HttpClient) { }

  get(): Observable<LanguageInfoInput[]> {
    return this.http.get<LanguageInfoInput[]>(getCvLanguagesUrl());
  }

  update(cvId: string, data: LanguageInfoOutput[]) {
    return this.http.put(getUpdateLanguageInfoUrl(cvId), data);
  }
}

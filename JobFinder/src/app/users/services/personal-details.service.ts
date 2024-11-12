import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../models/cv/personal-details';
import { BasicValueModel } from '../../core/models';
import { getCvCountriesUrl, getCvPersonalDetailsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: PersonalDetails): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(getCvPersonalDetailsUrl(), data);
  }

  get(cvId: string): Observable<PersonalDetails> {
    return this.http.get<PersonalDetails>(getCvPersonalDetailsUrl() + `/${cvId}`);
  }

  getCountries(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getCvCountriesUrl());
  }
}

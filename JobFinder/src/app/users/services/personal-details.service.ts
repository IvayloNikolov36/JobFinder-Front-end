import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../models/cv/personal-details';
import { BasicValueModel } from '../../core/models';


const baseUrl = 'https://localhost:44357/api/cvs/PersonalDetails';
const getCountriesUrl = baseUrl + '/countryTypes';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: PersonalDetails): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(baseUrl, data);
  }

  get(cvId: string): Observable<PersonalDetails> {
    return this.http.get<PersonalDetails>(baseUrl);
  }

  getCountries(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getCountriesUrl);
  }
}

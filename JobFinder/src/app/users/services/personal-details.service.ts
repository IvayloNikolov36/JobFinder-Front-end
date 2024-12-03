import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../models/cv/personal-details';
import { getCvPersonalDetailsUpdateUrl, getCvPersonalDetailsUrl } from '../../core/controllers';
import { PersonalDetailsOutput } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(private http: HttpClient) { }

  get(cvId: string): Observable<PersonalDetails> {
    return this.http.get<PersonalDetails>(getCvPersonalDetailsUrl() + `/${cvId}`);
  }

  create(cvId: string, data: PersonalDetails): Observable<Object> {
    data.cvId = cvId;
    return this.http.post(getCvPersonalDetailsUrl(), data);
  }

  update(cvId: string, data: PersonalDetailsOutput): Observable<Object> {
    return this.http.put(getCvPersonalDetailsUpdateUrl(cvId), data);
  }
}

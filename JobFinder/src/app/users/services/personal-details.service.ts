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

  update(data: PersonalDetailsOutput): Observable<Object> {
    return this.http.put(getCvPersonalDetailsUpdateUrl(), data);
  }

  mapPersonalInfo = (data: PersonalDetails): PersonalDetailsOutput => {
    return {
      id: data.id,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      genderId: data.gender.id,
      birthdate: data.birthdate,
      citizenshipId: data.citizenship.id,
      countryId: data.country.id,
      city: data.city
    } as PersonalDetailsOutput;
  }
}

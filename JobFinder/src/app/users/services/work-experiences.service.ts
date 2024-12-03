import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperienceOutput } from './../models/cv/';
import { getUpdateWorkExperienceInfoUrl } from '../../core/controllers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: WorkExperienceOutput[]): Observable<Object> {
    return this.http.put(getUpdateWorkExperienceInfoUrl(cvId), data);
  }
}

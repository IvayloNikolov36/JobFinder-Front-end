import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from '../models/cv/education';
import { getEducationLevelsUrl, getCvEducationsEditUrl, getCvEducationsUrl } from '../../core/controllers';
import { BasicModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: Education[]) => this.http.post(getCvEducationsUrl() + `/${cvId}`, data);

  get = (): Observable<Education[]> => this.http.get<Education[]>(getCvEducationsUrl());

  update = (cvId: string, data: Education[]) => this.http.put(getCvEducationsEditUrl(cvId), data);
}

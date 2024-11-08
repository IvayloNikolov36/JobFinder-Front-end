import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from '../models/cv/work-experience';
import { BasicValueModel } from '../../core/models';


const baseUrl = 'https://localhost:44357/api/cvs/WorkExperiences';
const getBusinessSectorsUrl = baseUrl + '/businessSectors';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  create(cvId: string, data: WorkExperience[]): Observable<Object> {
    return this.http.post(baseUrl + `/${cvId}`, data);
  }

  // TODO: check this method and all get methods in other services = the param is not used
  get = (cvId: string): Observable<WorkExperience[]> => this.http.get<WorkExperience[]>(baseUrl);

  getBusinessSectors(): Observable<BasicValueModel[]> {
    return this.http.get<BasicValueModel[]>(getBusinessSectorsUrl);
  }
}

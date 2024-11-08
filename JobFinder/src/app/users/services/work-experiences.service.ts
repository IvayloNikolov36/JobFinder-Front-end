import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from '../models/cv/work-experience';
import { SelectOptionsType } from '../../models/select-options-type';


const baseUrl = 'https://localhost:44357/api/cvs/WorkExperiences';
const getBusinessSectorsUrl = baseUrl + '/businessSectors';

@Injectable({
  providedIn: 'root'
})
export class WorkExperiencesService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: WorkExperience[]) => this.http.post(baseUrl + `/${cvId}`, data);

  // TODO: check this method = the param is not used
  get = (cvId: string): Observable<WorkExperience[]> => this.http.get<WorkExperience[]>(baseUrl);

  getBusinessSectors(): Observable<SelectOptionsType[]> {
    return this.http.get<SelectOptionsType[]>(getBusinessSectorsUrl);
  }
}

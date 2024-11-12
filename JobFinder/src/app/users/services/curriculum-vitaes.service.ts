import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvListing } from '../models/cv/cv-listing';
import { CvCreate } from '../models/cv/cv-create';
import { CvCreateResult } from '../models/cv/cv-create-result';
import { getCvsUrl, getCvUrl } from '../../core/controllers';


@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  getUserCVs = (): Observable<CvListing[]> => this.http.get<CvListing[]>(getCvsUrl());

  getCV = (cvId: string): Observable<object> => this.http.get<object>(getCvUrl(cvId));

  createCv = (data: CvCreate): Observable<CvCreateResult> => this.http.post<CvCreateResult>(getCvsUrl(), data);
}

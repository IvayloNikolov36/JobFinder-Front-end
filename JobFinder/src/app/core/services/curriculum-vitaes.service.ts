import { CvCreateResult } from './../models/cv/cv-create-result';
import { CvListing } from './../models/cv/cv-listing';
import { Observable } from 'rxjs';
import { CvCreate } from '../models/cv/cv-create';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:44357/api/cvs/';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  getUserCVs = (): Observable<CvListing[]> => this.http.get<CvListing[]>(baseUrl);
  getCV = (cvId: string): Observable<object> => this.http.get<object>(baseUrl + cvId);
  createCv = (data: CvCreate): Observable<CvCreateResult> => this.http.post<CvCreateResult>(baseUrl, data);
}


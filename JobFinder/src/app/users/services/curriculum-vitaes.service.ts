import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvListing } from '../models/cv/cv-listing';
import { CvCreate } from '../models/cv/cv-create';
import { CvCreateResult } from '../models/cv/cv-create-result';
import { getCvData, getCvsUrl } from '../../core/controllers';
import { CvListingData } from '../models/cv/cv-listing-data';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaesService {

  constructor(private http: HttpClient) { }

  getUserCVs = (): Observable<CvListing[]> => this.http.get<CvListing[]>(getCvsUrl());

  getCvListingData = (cvId: string): Observable<CvListingData> => this.http.get<CvListingData>(getCvData(cvId));

  createCv = (data: CvCreate): Observable<CvCreateResult> => this.http.post<CvCreateResult>(getCvsUrl(), data);
}

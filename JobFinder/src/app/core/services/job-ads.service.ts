import { RecruitmentOffer } from '../models/recruitment-offer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const createAdUrl = 'https://localhost:44357/api/recruitmentoffers/create';

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {
  userToken: string;
  constructor(
    private http: HttpClient
  ) {
    this.userToken = localStorage.getItem('token');
  }

  createOffer(data: RecruitmentOffer) {
    // return this.http.post(createAdUrl, data, {
    //     headers: new HttpHeaders().set('Authorization', `Bearer ${this.userToken}`)
    //   });

      return this.http.post(createAdUrl, data);
  }
}

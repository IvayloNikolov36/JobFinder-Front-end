import { RecruitmentOffer } from './../models/recruitment-offer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const createOfferUrl = 'https://localhost:44357/api/recruitmentoffers/create';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private http: HttpClient
  ) { }

  createOffer(data: RecruitmentOffer) {
    return this.http.post(createOfferUrl, data);
  }
}

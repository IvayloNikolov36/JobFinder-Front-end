import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience, WorkExperienceOutput } from './../models/cv/';
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

  mapWorkExperienceInfoData = (data: WorkExperience[]): WorkExperienceOutput[] => {
    return data.map((element: WorkExperience) => {
      return {
        id: element.id,
        cvId: element.cvId,
        fromDate: element.fromDate,
        toDate: element.toDate,
        jobTitle: element.jobTitle,
        organization: element.organization,
        businessSectorId: element.businessSector.id,
        location: element.location,
        additionalDetails: element.additionalDetails
      } as WorkExperienceOutput
    });
  }
}

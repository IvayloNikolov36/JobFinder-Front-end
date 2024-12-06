import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education, EducationOutput } from '../models/cv';
import { getCvEducationsEditUrl, getCvEducationsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  constructor(private http: HttpClient) { }

  get = (): Observable<Education[]> => this.http.get<Education[]>(getCvEducationsUrl());

  update = (cvId: string, data: EducationOutput[]) => this.http.put(getCvEducationsEditUrl(cvId), data);

  public mapEducationInfoData = (data: Education[]): EducationOutput[] => {
    return data.map((item: Education) => {
      return {
        id: item.id,
        cvId: item.cvId,
        organization: item.organization,
        fromDate: item.fromDate,
        toDate: item.toDate,
        location: item.location,
        educationLevelId: item.educationLevel.id,
        major: item.major,
        mainSubjects: item.mainSubjects
      } as EducationOutput;
    });
  }
}

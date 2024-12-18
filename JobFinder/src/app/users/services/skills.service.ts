import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillsInfo, SkillsInfoOutput } from '../models/cv';
import { getUpdateCvSkillsUrl } from '../../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  update(cvId: string, data: SkillsInfoOutput): Observable<Object> {
    return this.http.put(getUpdateCvSkillsUrl(cvId), data);
  }

  mapSkillsData(data: SkillsInfo): SkillsInfoOutput {
    return {
      id: data.id,
      hasManagedPeople: data.hasManagedPeople,
      otherSkills: data.otherSkills,
      computerSkills: data.computerSkills,
      drivingLicenseCategoryIds: data.drivingLicenseCategories.map(dc => dc.id)
    } as SkillsInfoOutput;
  }
}

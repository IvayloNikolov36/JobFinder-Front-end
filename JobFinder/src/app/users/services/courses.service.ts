import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseSertificate } from '../models/cv/course-certificat';


const baseUrl = 'https://localhost:44357/api/cvs/Courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  create = (cvId: string, data: CourseSertificate[]) => this.http.post(baseUrl + `/${cvId}`, data);

  get = (cvId: string): Observable<CourseSertificate[]> => this.http.get<CourseSertificate[]>(baseUrl);
}

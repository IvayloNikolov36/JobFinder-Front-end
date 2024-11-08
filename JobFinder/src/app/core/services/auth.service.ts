import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: fix urls on all places and use a const file maybe
  private readonly apiUrl = 'https://localhost:44357/api/';
  private readonly loginUrl = this.apiUrl + 'login';
  private readonly registerBaseUrl = this.apiUrl + 'register/';
  private readonly registerCompanyUrl = this.registerBaseUrl + 'company';
  private readonly registerUserUrl = this.registerBaseUrl + 'user';

  constructor(private http: HttpClient) {  }

  registerUser(body: any): Observable<Object> {
    return this.http.post(this.registerUserUrl, body);
  }

  registerComapny(body: any): Observable<Object> {
    return this.http.post(this.registerCompanyUrl, body);
  }

  login(body: any): Observable<Object> {
    return this.http.post(this.loginUrl, body);
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isCompany(): boolean {
    return localStorage.getItem('isCompany') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserName(): string | null {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}

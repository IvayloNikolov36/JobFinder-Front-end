import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly apiUrl = 'https://localhost:44357/api/';
  private readonly loginUrl = this.apiUrl + 'login';
  private readonly registerBaseUrl = this.apiUrl + 'register/';
  private readonly registerCompanyUrl = this.registerBaseUrl + 'company';
  private readonly registerUserUrl = this.registerBaseUrl + 'user';

  constructor(
    private http: HttpClient
  ) {  }

  registerUser(body) {
    return this.http.post(this.registerUserUrl, body);
  }

  registerComapny(body) {
    return this.http.post(this.registerCompanyUrl, body);
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  isCompany() {
    return localStorage.getItem('isCompany') === 'true';
  }

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}

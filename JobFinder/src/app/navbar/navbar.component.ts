import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'jf-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isAuthenticated!: boolean;
  isCompany!: boolean;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLogged: boolean) => {
      this.isAuthenticated = isLogged;
    });
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isCompany = this.authService.isCompany();
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

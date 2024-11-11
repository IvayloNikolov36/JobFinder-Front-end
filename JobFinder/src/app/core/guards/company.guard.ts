import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if (this.authService.isAuthenticated() && this.authService.isCompany()) {
      return true;
    }

    this.router.navigate(['/home']);

    this.toastr.error('Not allowed!');

    return false;
  }
}

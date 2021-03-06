import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/authentication/register-user/register-user.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterCompanyComponent } from './components/authentication/register-company/register-company.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/user', component: RegisterUserComponent },
  { path: 'register/company', component: RegisterCompanyComponent },
  {
    path: 'jobs',
    loadChildren: () => import('./components/job-ads/job-ads/job-ads.module').then(m => m.JobAdsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user-profile/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

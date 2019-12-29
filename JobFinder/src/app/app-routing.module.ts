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
  { path: 'offers',
    loadChildren: './components/recruitment-offers/recruitment-offers.module#RecruitmentOffersModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserCurriculumVitaesComponent } from './components/user-curriculum-vitaes/user-curriculum-vitaes.component';


const routes: Routes = [
  { path: 'create-cv', component: CreateCvComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: 'my-cvs', component: UserCurriculumVitaesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { UserAccountComponent } from './components/user-account/user-account.component';


const routes: Routes = [
  { path: 'create-cv', component: CreateCvComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

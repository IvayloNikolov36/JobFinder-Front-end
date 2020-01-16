import { AppPaginationComponent } from './../../shared/app-pagination/app-pagination.component';
import { AllAdsComponent } from './../all-ads/all-ads.component';
import { CreateAdComponent } from './../create-ad/create-ad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JobAdsService } from 'src/app/core/services/job-ads.service';


const routes: Routes = [
  { path: 'create', component: CreateAdComponent },
  { path: 'all', component: AllAdsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateAdComponent,
    AllAdsComponent,
    AppPaginationComponent
  ],
  providers: [
    JobAdsService,
  ]
})
export class JobAdsModule { }

import { JobDetailsResolver } from './../../../core/resolvers/job-details.resolver';
import { AppPaginationComponent } from './../../shared/app-pagination/app-pagination.component';
import { AllAdsComponent } from './../all-ads/all-ads.component';
import { CreateAdComponent } from './../create-ad/create-ad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobAdsService } from 'src/app/core/services/job-ads.service';
import { JobDetailsComponent } from '../job-details/job-details.component';

const routes: Routes = [
  { path: 'create', component: CreateAdComponent },
  { path: 'all', component: AllAdsComponent },
  {
    path: 'details/:id',
    component: JobDetailsComponent,
    resolve: {
      singleJob: JobDetailsResolver
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateAdComponent,
    AllAdsComponent,
    AppPaginationComponent,
    JobDetailsComponent,
  ],
  providers: [
    JobAdsService,
    JobDetailsResolver
  ]
})
export class JobAdsModule { }

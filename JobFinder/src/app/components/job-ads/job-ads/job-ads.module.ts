import { CreateAdComponent } from './../create-ad/create-ad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JobAdsService } from 'src/app/core/services/job-ads.service';


const routes: Routes = [
  { path: 'create', component: CreateAdComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateAdComponent,
  ],
  providers: [
    JobAdsService,
  ]
})
export class JobAdsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OffersService } from 'src/app/core/services/offers.service';

const routes: Routes = [
  { path: 'create', component: CreateOfferComponent },
];

@NgModule({
  declarations: [
    CreateOfferComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OffersService
  ]
})
export class RecruitmentOffersModule { }

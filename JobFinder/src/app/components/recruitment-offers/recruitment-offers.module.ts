import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateOfferComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'create', component: CreateOfferComponent },
    ])
  ],
  providers: [

  ]
})
export class RecruitmentOffersModule { }

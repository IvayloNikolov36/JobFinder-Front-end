import { OffersService } from './../../../core/services/offers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  form: FormGroup;
  constructor(
    private offersService: OffersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      position: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      daysActive: ['', [Validators.required, Validators.min(10), Validators.max(90)]]
    });
  }

  createOffer() {
    this.offersService.createOffer(this.form.value)
    .subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }

  get f() {
    return this.form.controls;
  }
}

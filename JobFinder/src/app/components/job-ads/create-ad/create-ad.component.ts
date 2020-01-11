import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobAdsService } from 'src/app/core/services/job-ads.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {
  form: FormGroup;
  constructor(
    private jobAdsService: JobAdsService,
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
    this.jobAdsService.createjobAd(this.form.value)
    .subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }

  get f() {
    return this.form.controls;
  }
}

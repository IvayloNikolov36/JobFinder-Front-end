import { Observable } from 'rxjs';
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

  jobCategories$: Observable<object[]>;
  jobEngagements$: Observable<object[]>;

  chosedCategory: any;
  chosedEngagement: any;

  constructor(
    private jobAdsService: JobAdsService,
    private fb: FormBuilder,
    private router: Router) {

    this.jobCategories$ = this.jobAdsService.getCategories();
    this.jobEngagements$ = this.jobAdsService.getEngagements();
  }

  ngOnInit() {
    this.form = this.fb.group({
      position: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      minSalary: [null, [Validators.min(1)]],
      maxSalary: [null, [Validators.min(1)]],
      jobCategoryId: ['', [Validators.required]],
      jobEngagementId: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  changeJobCategory(event) {
    const selectedValue = event.target.value;
    const val = selectedValue.split(':')[0];
    this.chosedCategory = parseInt(val, 10);
  }

  changeJobEngagement(event) {
    const selectedValue = event.target.value;
    const val = selectedValue.split(':')[0];
    this.chosedEngagement = parseInt(val, 10);
  }

  createOffer() {
    this.form.controls['jobCategoryId'].setValue(this.chosedCategory);
    this.form.controls['jobEngagementId'].setValue(this.chosedEngagement);

    console.log(this.form.value);

    this.jobAdsService.createjobAd(this.form.value)
    .subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }

  get f() {
    return this.form.controls;
  }
}

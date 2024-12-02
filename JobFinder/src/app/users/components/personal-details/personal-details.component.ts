import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalDetails } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';

@Component({
  selector: 'jf-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent implements OnInit {

  countries = input.required<BasicValueModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() personalDetailsData: PersonalDetails | null = null;
  @Output() emitPersonalDetails: EventEmitter<PersonalDetails> = new EventEmitter<PersonalDetails>();

  personalInfoForm!: FormGroup;
  countryControl: FormControl<any> = new FormControl();
  genderOptions!: BasicValueModel[];

  readonly emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeGenderOptions();
  }

  emitData(): void {
    this.emitPersonalDetails.emit(this.personalInfoForm.value);
  }

  private initializeGenderOptions(): void {
    this.genderOptions = [
      { value: 0, viewValue: 'Not specified' },
      { value: 1, viewValue: 'Male' },
      { value: 2, viewValue: 'Female' }
    ];
  }

  private initializeForm(): void {
    const controlls = {
      id: ['', []],
      cvId: ['', []],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      citizenShip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    };

    this.personalInfoForm = this.formBuilder.group(controlls);

    if (this.personalDetailsData) {
      this.setFormData(this.personalInfoForm, this.personalDetailsData);
    }
  }

  private setFormData = (form: FormGroup<any>, data: PersonalDetails): void => {
    form.controls['id'].setValue(data.id);
    form.controls['cvId'].setValue(data.cvId);
    form.controls['firstName'].setValue(data.firstName);
    form.controls['middleName'].setValue(data.middleName);
    form.controls['lastName'].setValue(data.lastName);
    form.controls['email'].setValue(data.email);
    form.controls['phone'].setValue(data.phone);
    form.controls['gender'].setValue(data.gender);
    form.controls['birthdate'].setValue(data.birthdate);
    form.controls['citizenShip'].setValue(data.citizenShip);
    form.controls['country'].setValue(data.country);
    form.controls['city'].setValue(data.city);
  }
}

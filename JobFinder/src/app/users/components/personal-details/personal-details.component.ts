import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalDetails } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent implements OnInit {

  countries = input.required<BasicModel[]>();
  citizenships = input.required<BasicModel[]>();
  genderOptions = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() personalDetailsData: PersonalDetails | null = null;
  @Output() emitPersonalDetails: EventEmitter<PersonalDetails> = new EventEmitter<PersonalDetails>();

  personalInfoForm!: FormGroup;
  countryControl: FormControl<any> = new FormControl();

  readonly emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  emitData(): void {
    this.emitPersonalDetails.emit(this.personalInfoForm.value);
  }

  private initializeForm(): void {
    const controlls = {
      id: [0, []],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required]],
      gender: [{} as BasicModel, [Validators.required]],
      birthdate: ['', [Validators.required]],
      citizenship: [{} as BasicModel, [Validators.required]],
      country: [{} as BasicModel, [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    };

    this.personalInfoForm = this.formBuilder.group(controlls);

    if (this.personalDetailsData) {
      this.setFormData(this.personalInfoForm, this.personalDetailsData);
    }
  }

  private setFormData = (form: FormGroup<any>, data: PersonalDetails): void => {
    form.controls['id'].setValue(data.id);
    form.controls['firstName'].setValue(data.firstName);
    form.controls['middleName'].setValue(data.middleName);
    form.controls['lastName'].setValue(data.lastName);
    form.controls['email'].setValue(data.email);
    form.controls['phone'].setValue(data.phone);
    form.controls['gender'].setValue(data.gender);
    form.controls['birthdate'].setValue(data.birthdate);
    form.controls['citizenship'].setValue(data.citizenship);
    form.controls['country'].setValue(data.country);
    form.controls['city'].setValue(data.city);
  }
}

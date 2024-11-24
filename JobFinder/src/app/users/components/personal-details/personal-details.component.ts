import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalDetails } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';

@Component({
  selector: 'jf-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent implements OnInit {

  countries = input.required<BasicValueModel[]>();
  @Output() passFormData: EventEmitter<PersonalDetails> = new EventEmitter<PersonalDetails>();

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
    this.passFormData.emit(this.personalInfoForm.value);
  }

  private initializeGenderOptions(): void {
    this.genderOptions = [
      { value: '0', viewValue: 'Not specified' },
      { value: '1', viewValue: 'Male' },
      { value: '2', viewValue: 'Female' }
    ];
  }

  private initializeForm(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      citizenShip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }
}

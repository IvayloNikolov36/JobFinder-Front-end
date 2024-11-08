import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOptionsType } from '../../../models/select-options-type';
import { Gender, PersonalDetails } from '../../models/cv';


@Component({
  selector: 'jf-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent {

  @Input() countries: SelectOptionsType[] = [];
  @Output() passFormData: EventEmitter<PersonalDetails> = new EventEmitter<PersonalDetails>();

  personalInfoForm!: FormGroup;
  countryControl: FormControl<any> = new FormControl();
  genderOptions!: Gender[];
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(private formBuilder: FormBuilder) { }

  // TODO: refactor
  ngOnInit() {
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

    this.genderOptions = [
      { value: '0', viewValue: 'Not specified' },
      { value: '1', viewValue: 'Male' },
      { value: '2', viewValue: 'Female' }
    ];
  }

  emitData() {
    console.log(JSON.stringify(this.personalInfoForm.value));
    this.passFormData.emit(this.personalInfoForm.value);
  }
}

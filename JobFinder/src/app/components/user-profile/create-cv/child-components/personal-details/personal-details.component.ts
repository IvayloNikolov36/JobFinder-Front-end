import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectOptionsType } from '../../../../../core/models/common/select-options-type';
import { PersonalDetails } from './../../../../../core/models/cv/personal-details';
import { Gender } from './../../../../../core/models/common/gender';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalInfoForm: FormGroup;
  countryControl = new FormControl();
  genderOptions: Gender[];
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  @Input() countries: SelectOptionsType[];
  @Output() passFormData = new EventEmitter<PersonalDetails>();

  constructor(private formBuilder: FormBuilder) {
  }

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
      {value: '0', viewValue: 'Not specified'},
      {value: '1', viewValue: 'Male'},
      {value: '2', viewValue: 'Female'}
    ];
  }


  get pif() {
    return this.personalInfoForm.controls;
  }

  emitData() {
    console.log(JSON.stringify(this.personalInfoForm.value));
    this.passFormData.emit(this.personalInfoForm.value);
  }
}

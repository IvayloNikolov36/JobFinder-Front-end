import { PersonalDetails } from './../../../../../core/models/cv/personal-details';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalInfoForm: FormGroup;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  @Output() passFormData = new EventEmitter<PersonalDetails>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required]]
    });
  }

  get pif() {
    return this.personalInfoForm.controls;
  }

  emitData() {
    this.passFormData.emit(this.personalInfoForm.value);
  }
}

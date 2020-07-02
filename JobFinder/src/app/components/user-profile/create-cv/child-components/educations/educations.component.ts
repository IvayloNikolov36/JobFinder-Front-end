import { Education } from '../../../../../core/models/cv/education';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationComponent implements OnInit {
  educationsForm: FormGroup;

  @Output() emitEducationData = new EventEmitter<Education[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.educationsForm = this.formBuilder.group({
      educationsArray: new FormArray([])
    });
    this.addNewEducationForm();
  }

  addNewEducationForm() {
    this.ed.push(this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      educationLevel: ['', [Validators.required]],
      major: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mainSubjects: ['', [Validators.minLength(10), Validators.maxLength(1000)]]
    }));
  }

  removeLastEducationForm() {
    if (this.ed.length === 1) {
      return;
    }
    this.ed.removeAt(this.ed.length - 1);
  }

  get edf() {
    return this.educationsForm.controls;
  }

  get ed() {
    return this.edf.educationsArray as FormArray;
  }

  emitData() {
    this.emitEducationData.emit(this.educationsForm.value.educationsArray);
  }

}

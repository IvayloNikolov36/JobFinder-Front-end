import { SelectOptionsType } from './../../../../../core/models/common/select-options-type';
import { Observable } from 'rxjs';
import { Education } from '../../../../../core/models/cv/education';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationComponent implements OnInit {
  educationsForm: FormGroup;

  @Input() educationLevels: Observable<SelectOptionsType[]>;
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
      mainSubjects: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
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

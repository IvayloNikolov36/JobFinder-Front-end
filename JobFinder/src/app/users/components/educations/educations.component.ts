import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectOptionsType } from '../../../models/select-options-type';
import { Education } from '../../models/cv';


@Component({
  selector: 'jf-educations',
  templateUrl: './educations.component.html'
})
export class EducationsComponent implements OnInit {

  @Input() educationLevels!: Observable<SelectOptionsType[]>;
  @Output() emitEducationData = new EventEmitter<Education[]>();

  educationsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.educationsForm = this.formBuilder.group({
      educationsArray: new FormArray<FormGroup>([])
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
    return this.edf['educationsArray'] as FormArray<FormGroup>;
  }

  emitData() {
    this.emitEducationData.emit(this.educationsForm.value.educationsArray);
  }
}

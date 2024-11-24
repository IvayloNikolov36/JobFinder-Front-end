import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';

@Component({
  selector: 'jf-educations',
  templateUrl: './educations.component.html'
})
export class EducationsComponent implements OnInit {

  educationLevels = input.required<BasicValueModel[]>();
  @Output() emitEducationData = new EventEmitter<Education[]>();

  educationsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.addNewEducationForm();
  }

  get edf() {
    return this.educationsForm.controls;
  }

  get ed() {
    return this.edf['educationsArray'] as FormArray<FormGroup>;
  }

  addNewEducationForm(): void {
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

  removeLastEducationForm(): void {
    if (this.ed.length === 1) {
      return;
    }
    this.ed.removeAt(this.ed.length - 1);
  }

  emitData(): void {
    this.emitEducationData.emit(this.educationsForm.value.educationsArray);
  }

  private initializeForm(): void {
    this.educationsForm = this.formBuilder.group({
      educationsArray: new FormArray<FormGroup>([])
    });
  }
}

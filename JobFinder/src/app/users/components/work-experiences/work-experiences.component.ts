import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperience } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';

@Component({
  selector: 'jf-work-experiences',
  templateUrl: './work-experiences.component.html'
})
export class WorkExperiencesComponent implements OnInit {

  businessSectors = input.required<BasicValueModel[]>();
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperience[]> = new EventEmitter<WorkExperience[]>();

  workExpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.addWorkExperienceForm();
  }

  get f() {
    return this.workExpForm.controls;
  }

  get we() {
    return this.f['weArray'] as FormArray<FormGroup>;
  }

  addWorkExperienceForm(): void {
    this.we.push(this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: ['', [Validators.minLength(20), Validators.maxLength(3000)]]
    }));
  }

  removeWorkExperienceForm(): void {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(this.we.length - 1);
  }

  emitData(): void {
    this.emitWorkExperiencesData.emit(this.workExpForm.value.weArray);
  }

  private initializeForm(): void {
    this.workExpForm = this.formBuilder.group({
      weArray: new FormArray<FormGroup>([])
    });
  }
}

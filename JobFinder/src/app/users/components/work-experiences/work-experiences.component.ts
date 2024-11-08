import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOptionsType } from '../../../models/select-options-type';
import { WorkExperience } from '../../models/cv';


@Component({
  selector: 'jf-work-experiences',
  templateUrl: './work-experiences.component.html'
})
export class WorkExperiencesComponent {

  @Input() businessSectors: SelectOptionsType[] = [];
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperience[]> = new EventEmitter<WorkExperience[]>();

  workExpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.workExpForm = this.formBuilder.group({
      weArray: new FormArray<FormGroup>([])
    });

    this.addWorkExperienceForm();
  }

  addWorkExperienceForm() {
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

  removeWorkExperienceForm() {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(this.we.length - 1);
  }

  emitData() {
    this.emitWorkExperiencesData.emit(this.workExpForm.value.weArray);
  }

  get f() {
    return this.workExpForm.controls;
  }

  get we() {
    return this.f['weArray'] as FormArray<FormGroup>;
  }
}

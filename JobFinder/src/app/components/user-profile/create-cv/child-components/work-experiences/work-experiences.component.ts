import { SelectOptionsType } from './../../../../../core/models/common/select-options-type';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkExperience } from 'src/app/core/models/cv/work-experience';

@Component({
  selector: 'app-work-experiences',
  templateUrl: './work-experiences.component.html',
  styleUrls: ['./work-experiences.component.css']
})
export class WorkExperiencesComponent implements OnInit {
  workExperiencesForm: FormGroup;

  @Input() businessSectors: SelectOptionsType[];
  @Output() emitWorkExperiencesData = new EventEmitter<WorkExperience[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.workExperiencesForm = this.formBuilder.group({
      weArray: new FormArray([])
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
    this.emitWorkExperiencesData.emit(this.workExperiencesForm.value.weArray);
  }

  get f() {
    return this.workExperiencesForm.controls;
  }

  get we() {
    return this.f.weArray as FormArray;
  }

}

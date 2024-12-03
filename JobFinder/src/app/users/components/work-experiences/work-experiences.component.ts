import { Component, effect, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperience } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-work-experiences',
  templateUrl: './work-experiences.component.html'
})
export class WorkExperiencesComponent implements OnInit {

  businessSectors = input.required<BasicModel[]>();

  @Input() isEditMode: boolean = false;
  @Input() workExperienceInfoData: WorkExperience[] = [];
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperience[]> = new EventEmitter<WorkExperience[]>();

  workExpForm!: FormGroup;
  businessSectorsData!: BasicModel[];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.businessSectorsData = this.businessSectors();
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.addForms();
  }

  get f() {
    return this.workExpForm.controls;
  }

  get we() {
    return this.f['weArray'] as FormArray<FormGroup>;
  }

  addWorkExperienceForm(): FormGroup<any> {
    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: ['', []],
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: ['', [Validators.minLength(20), Validators.maxLength(3000)]]
    });

    this.we.push(formGroup);

    return formGroup;
  }

  removeWorkExperienceForm(): void {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(this.we.length - 1);
  }

  emitData(): void {
    const data: any[] = this.workExpForm.value.weArray;
    data.forEach(element => {
      if (!element.id) {
        element.id = 0;
      }
      const correspondingSecor = this.businessSectorsData
        .filter(bs => bs.id === element.businessSector)[0];
      element.businessSector = { ...correspondingSecor };
    });
    this.emitWorkExperiencesData.emit(data);
  }

  private initializeForm(): void {
    this.workExpForm = this.formBuilder.group({
      weArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.workExperienceInfoData.length > 0) {
      this.workExperienceInfoData.forEach((we: WorkExperience) => {
        const formGroup: FormGroup<any> = this.addWorkExperienceForm();
        formGroup.controls['id'].setValue(we.id);
        formGroup.controls['fromDate'].setValue(we.fromDate);
        formGroup.controls['toDate'].setValue(we.toDate);
        formGroup.controls['jobTitle'].setValue(we.jobTitle);
        formGroup.controls['organization'].setValue(we.organization);
        formGroup.controls['businessSector'].setValue(we.businessSector.id);
        formGroup.controls['location'].setValue(we.location);
        formGroup.controls['additionalDetails'].setValue(we.additionalDetails);
      });
    } else {
      this.addWorkExperienceForm();
    }
  }
}

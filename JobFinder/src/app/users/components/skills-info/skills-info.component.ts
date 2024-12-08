import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillsInfo } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-skills-info',
  templateUrl: './skills-info.component.html'
})
export class SkillsInfoComponent implements OnInit {

  drivingCategories = input.required<BasicModel[]>();
  @Input() isEditMode = false;
  @Input() skillsInfoData: SkillsInfo | null = null;
  @Output() emitSkillsData = new EventEmitter<SkillsInfo>();

  skillsForm!: FormGroup;
  drivingLicenseCategories: FormControl<BasicModel[]> = new FormControl();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get sf() {
    return this.skillsForm.controls;
  }

  emitData(): void {
    const dataToEmit: SkillsInfo = {
      ...this.skillsForm.value as SkillsInfo,
      drivingLicenseCategories: this.drivingLicenseCategories.value
    } as SkillsInfo;

    this.emitSkillsData.emit(dataToEmit);
  }

  private initializeForm(): void {
    const controllsObject = {
      id: [0, []],
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      otherSkills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: [false, []]
    };

    this.skillsForm = this.formBuilder.group(controllsObject);

    if (this.skillsInfoData) {
      this.setFormData(this.skillsForm, this.skillsInfoData);
    }
  }

  private setFormData = (form: FormGroup<any>, data: SkillsInfo): void => {
    form.controls['id'].setValue(data.id);
    form.controls['computerSkills'].setValue(data.computerSkills);
    form.controls['otherSkills'].setValue(data.otherSkills);
    form.controls['hasManagedPeople'].setValue(data.hasManagedPeople);
    this.drivingLicenseCategories.setValue(data.drivingLicenseCategories);
  }
}

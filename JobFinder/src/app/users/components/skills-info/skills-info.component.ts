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
  categories: FormControl<any> = new FormControl();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get sf() {
    return this.skillsForm.controls;
  }

  emitData(): void {
    this.emitSkillsData.emit(this.skillsForm.value);
  }

  private initializeForm(): void {
    const controllsObject = {
      id: [0, []],
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      skills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: [false, []],
      drivingCategoryType: ['', []]
    };

    this.skillsForm = this.formBuilder.group(controllsObject);

    if (this.skillsInfoData) {
      this.setFormData(this.skillsForm, this.skillsInfoData);
    }
  }

  private setFormData = (form: FormGroup<any>, data: SkillsInfo): void => {
    form.controls['id'].setValue(data.id);
    form.controls['computerSkills'].setValue(data.computerSkills);
    form.controls['skills'].setValue(data.otherSkills);
    form.controls['hasManagedPeople'].setValue(data.hasManagedPeople);
    // form.controls['hasDrivingLicense'].setValue(data.hasDrivingLicense);
  }
}

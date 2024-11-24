import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DrivingCategory, SkillsInfo } from '../../models/cv';

@Component({
  selector: 'jf-skills-info',
  templateUrl: './skills-info.component.html'
})
export class SkillsInfoComponent implements OnInit {

  drivingCategories = input.required<DrivingCategory[]>();
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
    this.skillsForm = this.formBuilder.group({
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      skills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: ['', []],
      drivingCategoryType: ['', []]
    });
  }
}

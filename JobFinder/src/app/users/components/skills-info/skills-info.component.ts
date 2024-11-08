import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DrivingCategory, SkillsInfo } from '../../models/cv';


@Component({
  selector: 'jf-skills-info',
  templateUrl: './skills-info.component.html'
})
export class SkillsInfoComponent {

  @Input() drivingCategories!: Observable<DrivingCategory[]>;
  @Output() emitSkillsData = new EventEmitter<SkillsInfo>();

  skillsForm!: FormGroup;
  categories = new FormControl();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.skillsForm = this.formBuilder.group({
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      skills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: ['', []],
      drivingCategoryType: ['', []]
    });
  }

  get sf() {
    return this.skillsForm.controls;
  }

  emitData() {
    this.emitSkillsData.emit(this.skillsForm.value);
  }
}

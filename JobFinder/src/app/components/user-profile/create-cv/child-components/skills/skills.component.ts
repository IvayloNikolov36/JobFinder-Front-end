import { DrivingCategory } from './../../../../../core/models/cv/driving-category';
import { SkillsInfo } from './../../../../../core/models/cv/SkillsInfo';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsForm: FormGroup;
  categories = new FormControl();

  @Input() drivingCategories: Observable<DrivingCategory[]>;
  @Output() emitSkillsData = new EventEmitter<SkillsInfo>();

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


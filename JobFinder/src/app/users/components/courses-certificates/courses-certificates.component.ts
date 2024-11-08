import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseSertificate } from '../../models/cv';

@Component({
  selector: 'jf-courses-certificates',
  templateUrl: './courses-certificates.component.html'
})
export class CoursesCertificatesComponent implements OnInit {

  @Output() emitCoursesData: EventEmitter<CourseSertificate[]> = new EventEmitter<CourseSertificate[]>();

  coursesForm!: FormGroup;
  readonly urlPattern = /^(http(s)?:\/\/)(.+)$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.coursesForm = this.formBuilder.group({
      coursesArray: new FormArray<FormGroup>([])
    });
    this.addNewCoursesFrom();
  }

  addNewCoursesFrom() {
    this.c.push(this.formBuilder.group({
      courseName: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', [Validators.pattern(this.urlPattern)]]
    }));
  }

  removeLastCoursesForm() {
    if (this.c.length === 1) {
      return;
    }
    this.c.removeAt(this.c.length - 1);
  }

  get cf() {
    return this.coursesForm.controls;
  }

  get c() {
    return this.cf['coursesArray'] as FormArray<FormGroup>;
  }

  emitData() {
    this.emitCoursesData.emit(this.coursesForm.value.coursesArray);
  }
}

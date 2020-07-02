import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseSertificate } from 'src/app/core/models/cv/course-sertificate';

@Component({
  selector: 'app-courses-certificates',
  templateUrl: './courses-certificates.component.html',
  styleUrls: ['./courses-certificates.component.css']
})
export class CoursesCertificatesComponent implements OnInit {
  coursesForm: FormGroup;

  @Output() emitCoursesData = new EventEmitter<CourseSertificate[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.coursesForm = this.formBuilder.group({
      coursesArray: new FormArray([])
    });
    this.addNewCoursesFrom();
  }

  addNewCoursesFrom() {
    this.c.push(this.formBuilder.group({
      courseName: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', []]
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
    return this.cf.coursesArray as FormArray;
  }

  emitData() {
    this.emitCoursesData.emit(this.coursesForm.value.coursesArray);
  }

}

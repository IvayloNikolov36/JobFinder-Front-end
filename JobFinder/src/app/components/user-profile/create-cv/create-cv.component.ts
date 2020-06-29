import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit {
  cvData: object[];
  cvId: string;

  cvForm: FormGroup;
  personalInfoForm: FormGroup;
  workExperienceForm: FormGroup;
  educationForm: FormGroup;
  languageForm: FormGroup;
  skillsForm: FormGroup;
  coursesForm: FormGroup;

  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  urlPicPattern = /^(http(s)?:\/\/)(.+)\.(jp(e)?g)$/;

  constructor(
    private fb: FormBuilder,
    private cvService: CurriculumVitaesService
  ) { }

  ngOnInit() {
    this.cvForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      pictureUrl: ['', [Validators.required, Validators.pattern(this.urlPicPattern)]]
    });

    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required]]
    });

    this.workExperienceForm = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: ['', []],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: ['', [Validators.minLength(20), Validators.maxLength(3000)]]
    });

    this.educationForm = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      educationLevel: ['', [Validators.required]],
      major: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mainSubjects: ['', [Validators.minLength(10), Validators.maxLength(1000)]]
    });

    this.languageForm = this.fb.group({
      languageType: ['', [Validators.required]],
      comprehension: ['', [Validators.required]],
      speaking: ['', [Validators.required]],
      writing: ['', [Validators.required]]
    });

    this.skillsForm = this.fb.group({
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      skills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: ['', []],
      drivingCategoryType: ['', []]
    });

    this.coursesForm = this.fb.group({
      courseName: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', []]
    });
  }

  sendCVdata() {
    this.cvService.createCv(this.cvForm.value).subscribe((data) => {
      this.cvId = data['cvId'];
      this.cvService.createPersonalDetails(this.cvId, this.personalInfoForm.value).subscribe();
      this.cvService.createWorkExperiences(this.cvId, this.workExperienceForm.value).subscribe();
      this.cvService.createEducations(this.cvId, this.educationForm.value).subscribe();
      this.cvService.createLanguages(this.cvId, this.languageForm.value).subscribe();
      this.cvService.createSkills(this.cvId, this.skillsForm.value).subscribe();
      this.cvService.createCourses(this.cvId, this.coursesForm.value).subscribe();
    });

  }

  get cvf() {
    return this.cvForm.controls;
  }

  get pif() {
    return this.personalInfoForm.controls;
  }

  get wef() {
    return this.workExperienceForm.controls;
  }

  get edf() {
    return this.educationForm.controls;
  }

  get lf() {
    return this.languageForm.controls;
  }

  get sf() {
    return this.skillsForm.controls;
  }

  get cf() {
    return this.coursesForm.controls;
  }

}

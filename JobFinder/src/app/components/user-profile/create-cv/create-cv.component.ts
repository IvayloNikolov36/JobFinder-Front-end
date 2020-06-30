import { SkillsInfo } from './../../../core/models/cv/SkillsInfo';
import { PersonalDetails } from './../../../core/models/cv/personal-details';
import { WorkExperience } from './../../../core/models/cv/work-experience';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  dynamicWorkExperienceForm: FormGroup;
  educationForm: FormGroup;
  languageForm: FormGroup;
  coursesForm: FormGroup;

  personalDetails: PersonalDetails;
  skillsInfo: SkillsInfo;

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

    this.dynamicWorkExperienceForm = this.fb.group({
      weArray: new FormArray([])
    });
    this.addWorkExperienceForm();

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

    this.coursesForm = this.fb.group({
      courseName: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', []]
    });

  }

  onPassedPersonalDetailsData(data: PersonalDetails) {
    this.personalDetails = data;
  }

  onPassedSkillsInfoData(data: SkillsInfo) {
    this.skillsInfo = data;
  }

  sendCVdata() {
    this.cvService.createCv(this.cvForm.value).subscribe((data) => {
      this.cvId = data['cvId'];
      this.cvService.createPersonalDetails(this.cvId, this.personalDetails).subscribe();
      this.cvService.createWorkExperiences(this.cvId, this.dynamicWorkExperienceForm.value.weArray).subscribe();
      this.cvService.createEducations(this.cvId, this.educationForm.value).subscribe();
      this.cvService.createLanguages(this.cvId, this.languageForm.value).subscribe();
      this.cvService.createSkills(this.cvId, this.skillsInfo).subscribe();
      this.cvService.createCourses(this.cvId, this.coursesForm.value).subscribe();
    });

  }

  addWorkExperienceForm() {
    this.we.push(this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', []],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: ['', []],
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


  get cvf() {
    return this.cvForm.controls;
  }

  get wef() {
    return this.dynamicWorkExperienceForm.controls;
  }

  get we() {
    return this.wef.weArray as FormArray;
  }

  get edf() {
    return this.educationForm.controls;
  }

  get lf() {
    return this.languageForm.controls;
  }


  get cf() {
    return this.coursesForm.controls;
  }

}

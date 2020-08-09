import { CoursesService } from './../../../core/services/cv-services/courses.service';
import { SkillsService } from './../../../core/services/cv-services/skills.service';
import { EducationsService } from './../../../core/services/cv-services/educations.service';
import { CvCreateResult } from './../../../core/models/cv/cv-create-result';
import { Observable, Subscription } from 'rxjs';
import { SelectOptionsType } from '../../../core/models/common/select-options-type';
import { CvCreate } from './../../../core/models/cv/cv-create';
import { WorkExperience } from './../../../core/models/cv/work-experience';
import { CourseSertificate } from './../../../core/models/cv/course-sertificate';
import { LanguageInfo } from './../../../core/models/cv/language-info';
import { Education } from './../../../core/models/cv/education';
import { SkillsInfo } from './../../../core/models/cv/SkillsInfo';
import { PersonalDetails } from './../../../core/models/cv/personal-details';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalDetailsService } from 'src/app/core/services/cv-services/personal-details.service';
import { WorkExperiencesService } from 'src/app/core/services/cv-services/work-experiences.service';
import { LanguagesInfoService } from 'src/app/core/services/cv-services/languages-info.service';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  countries: SelectOptionsType[];
  businessSectors: SelectOptionsType[];

  educationLevels$: Observable<SelectOptionsType[]>;
  languageTypes$: Observable<SelectOptionsType[]>;
  languageLevels$: Observable<SelectOptionsType[]>;
  // drivingCategories$: Observable<DrivingCategory[]>;

  cvInfo: CvCreate;
  personalDetails: PersonalDetails;
  workExperiences: WorkExperience[];
  educations: Education[];
  languagesInfo: LanguageInfo[];
  skillsInfo: SkillsInfo;
  coursesCertificates: CourseSertificate[];

  constructor(
    private cvService: CurriculumVitaesService,
    private pDetailsService: PersonalDetailsService,
    private educationsService: EducationsService,
    private workExpService: WorkExperiencesService,
    private languagesService: LanguagesInfoService,
    private skillsService: SkillsService,
    private coursesService: CoursesService
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.pDetailsService.getCountries().subscribe((data) => {
      this.countries = data;
    }));
    this.subscriptions.push(this.workExpService.getBusinessSectors().subscribe((data) => {
      this.businessSectors = data;
    }));
    this.educationLevels$ = this.educationsService.getEducationLevels();
    this.languageTypes$ = this.languagesService.getLanguageTypes();
    this.languageLevels$ = this.languagesService.getLanguageLevels();
    // this.drivingCategories$ = this.skillsService.getDrivingCategories();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onPassedCvInfoData = (data: CvCreate) => this.cvInfo = data;
  onPassedPersonalDetailsData = (data: PersonalDetails) => this.personalDetails = data;
  onPassedWorkExperiencesData = (data: WorkExperience[]) => this.workExperiences = data;
  onPassedEducationData = (data: Education[]) => this.educations = data;
  onPassedLanguagesInfo = (data: LanguageInfo[]) => this.languagesInfo = data;
  onPassedSkillsInfoData = (data: SkillsInfo) => this.skillsInfo = data;
  onPassedCoursesData = (data: CourseSertificate[]) => this.coursesCertificates = data;

  sendCVdata() {
    this.subscriptions.push(this.cvService.createCv(this.cvInfo).subscribe((data: CvCreateResult) => {
      console.log('cvId: ' + data.cvId);
      this.subscriptions.push(this.pDetailsService.create(data.cvId, this.personalDetails).subscribe());
      this.subscriptions.push(this.workExpService.create(data.cvId, this.workExperiences).subscribe());
      this.subscriptions.push(this.educationsService.create(data.cvId, this.educations).subscribe());
      this.subscriptions.push(this.languagesService.create(data.cvId, this.languagesInfo).subscribe());
      this.subscriptions.push(this.skillsService.create(data.cvId, this.skillsInfo).subscribe());
      this.subscriptions.push(this.coursesService.create(data.cvId, this.coursesCertificates).subscribe());
    }));
  }

}

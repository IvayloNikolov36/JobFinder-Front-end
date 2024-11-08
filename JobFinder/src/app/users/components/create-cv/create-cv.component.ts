import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { SelectOptionsType } from '../../../models/select-options-type';
import { CvInfoComponent } from '../cv-info/cv-info.component';
import { FormGroup } from '@angular/forms';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { EducationsComponent } from '../educations/educations.component';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import { CourseSertificate, CvCreate, CvCreateResult, DrivingCategory, Education, LanguageInfo, PersonalDetails, SkillsInfo, WorkExperience } from '../../models/cv';
import { CoursesService, CurriculumVitaesService, EducationsService, LanguagesInfoService, PersonalDetailsService, SkillsService, WorkExperiencesService } from '../../services';


@Component({
  selector: 'jf-create-cv',
  templateUrl: './create-cv.component.html'
})
export class CreateCvComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CvInfoComponent) cvInfoComponent!: CvInfoComponent;
  @ViewChild(PersonalDetailsComponent) personalDetailsComponent!: PersonalDetailsComponent;
  @ViewChild(WorkExperiencesComponent) workExperiencesComponent!: WorkExperiencesComponent;
  @ViewChild(EducationsComponent) educationsComponent!: EducationsComponent;
  @ViewChild(LanguagesInfoComponent) languagesInfoComponent!: LanguagesInfoComponent;
  @ViewChild(SkillsInfoComponent) skillsInfoComponent!: SkillsInfoComponent;
  @ViewChild(CoursesCertificatesComponent) coursesCertificatesComponent!: CoursesCertificatesComponent;

  cvInfoForm!: FormGroup<any>;
  personalDetailsForm!: FormGroup<any>;
  workExperiencesForm!: FormGroup<any>;
  educationsForm!: FormGroup<any>;
  languagesInfoForm!: FormGroup<any>;
  skillsInfoForm!: FormGroup<any>;
  coursesCertificatesForm!: FormGroup<any>;

  subscriptions: Subscription[] = [];
  countries!: SelectOptionsType[];
  businessSectors!: SelectOptionsType[];

  educationLevels$!: Observable<SelectOptionsType[]>;
  languageTypes$!: Observable<SelectOptionsType[]>;
  languageLevels$!: Observable<SelectOptionsType[]>;
  drivingCategories: Observable<DrivingCategory[]> = EMPTY; // remove
  // drivingCategories$!: Observable<DrivingCategory[]>;

  cvInfo!: CvCreate;
  personalDetails!: PersonalDetails;
  workExperiences!: WorkExperience[];
  educations!: Education[];
  languagesInfo!: LanguageInfo[];
  skillsInfo!: SkillsInfo;
  coursesCertificates!: CourseSertificate[];

  constructor(
    private cdref: ChangeDetectorRef,
    private cvService: CurriculumVitaesService,
    private pDetailsService: PersonalDetailsService,
    private educationsService: EducationsService,
    private workExpService: WorkExperiencesService,
    private languagesService: LanguagesInfoService,
    private skillsService: SkillsService,
    private coursesService: CoursesService
    ) { }

    // TODO: refactor the hook
  ngOnInit() {
    this.subscriptions.push(this.pDetailsService.getCountries().subscribe((data: any[]) => {
      this.countries = data;
    }));
    this.subscriptions.push(this.workExpService.getBusinessSectors().subscribe((data: any[]) => {
      this.businessSectors = data;
    }));
    this.educationLevels$ = this.educationsService.getEducationLevels();
    this.languageTypes$ = this.languagesService.getLanguageTypes();
    this.languageLevels$ = this.languagesService.getLanguageLevels();
    // TODO: fix the driving categories
    // this.drivingCategories$ = this.skillsService.getDrivingCategories();
  }

  ngAfterViewInit() {
    this.cvInfoForm = this.cvInfoComponent.cvInfoForm;
    this.personalDetailsForm = this.personalDetailsComponent.personalInfoForm;
    this.workExperiencesForm = this.workExperiencesComponent.workExpForm;
    this.educationsForm = this.educationsComponent.educationsForm;
    this.languagesInfoForm = this.languagesInfoComponent.languagesForm;
    this.skillsInfoForm = this.skillsInfoComponent.skillsForm;
    this.coursesCertificatesForm = this.coursesCertificatesComponent.coursesForm;
    this.cdref.detectChanges();
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
    // TODO: refactor the method and redirect to a page
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

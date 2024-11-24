import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { CvInfoComponent } from '../cv-info/cv-info.component';
import { FormGroup } from '@angular/forms';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { EducationsComponent } from '../educations/educations.component';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import {
  CourseSertificate,
  CvCreate,
  DrivingCategory,
  Education,
  LanguageInfo,
  PersonalDetails,
  SkillsInfo,
  WorkExperience
} from '../../models/cv';
import {
  CurriculumVitaesService,
  EducationsService,
  LanguagesInfoService,
  PersonalDetailsService,
  WorkExperiencesService
} from '../../services';
import { BasicValueModel } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';

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
  countries!: BasicValueModel[];
  businessSectors!: BasicValueModel[];

  educationLevels$!: Observable<BasicValueModel[]>;
  languageTypes$!: Observable<BasicValueModel[]>;
  languageLevels$!: Observable<BasicValueModel[]>;
  drivingCategories: Observable<DrivingCategory[]> = EMPTY; // remove
  // drivingCategories$!: Observable<DrivingCategory[]>;

  cvModel: CvCreate = {} as CvCreate;

  constructor(
    private cdref: ChangeDetectorRef,
    private cvService: CurriculumVitaesService,
    private pDetailsService: PersonalDetailsService,
    private educationsService: EducationsService,
    private workExpService: WorkExperiencesService,
    private languagesService: LanguagesInfoService,
    private toastr: ToastrService
  ) { }

  // TODO: refactor the hook
  ngOnInit(): void {
    this.subscriptions.push(this.pDetailsService.getCountries().subscribe((data: BasicValueModel[]) => {
      this.countries = data;
    }));
    this.subscriptions.push(this.workExpService.getBusinessSectors().subscribe((data: BasicValueModel[]) => {
      this.businessSectors = data;
    }));
    this.educationLevels$ = this.educationsService.getEducationLevels();
    this.languageTypes$ = this.languagesService.getLanguageTypes();
    this.languageLevels$ = this.languagesService.getLanguageLevels();
    // TODO: fix the driving categories
    // this.drivingCategories$ = this.skillsService.getDrivingCategories();
  }

  ngAfterViewInit(): void {
    this.cvInfoForm = this.cvInfoComponent.cvInfoForm;
    this.personalDetailsForm = this.personalDetailsComponent.personalInfoForm;
    this.workExperiencesForm = this.workExperiencesComponent.workExpForm;
    this.educationsForm = this.educationsComponent.educationsForm;
    this.languagesInfoForm = this.languagesInfoComponent.languagesForm;
    this.skillsInfoForm = this.skillsInfoComponent.skillsForm;
    this.coursesCertificatesForm = this.coursesCertificatesComponent.coursesForm;
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onPassedCvInfoData = (data: { name: string, pictureUrl: string }): void => {
    this.cvModel.name = data.name;
    this.cvModel.pictureUrl = data.pictureUrl;
  };

  onPassedPersonalDetailsData = (data: PersonalDetails): void => {
    this.cvModel.personalDetails = data;
  }

  onPassedWorkExperiencesData = (data: WorkExperience[]): void => {
    this.cvModel.workExperiences = data;
  }

  onPassedEducationData = (data: Education[]): void => {
    this.cvModel.educations = data;
  }

  onPassedLanguagesInfo = (data: LanguageInfo[]): void => {
    this.cvModel.languagesInfo = data;
  }

  onPassedSkillsInfoData = (data: SkillsInfo): void => {
    this.cvModel.skills = data;
  }

  onPassedCoursesData = (data: CourseSertificate[]): void => {
    this.cvModel.courseCertificates = data;
  }

  sendCVdata = (): void => {
    this.cvService.createCv(this.cvModel)
      .subscribe(() => {
        this.toastr.success(`${this.cvModel.name} cv is successfully created.`);
      });
  }
}

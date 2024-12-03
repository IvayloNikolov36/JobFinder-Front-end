import { SkillsService } from './../../services/skills.service';
import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, Signal, signal } from '@angular/core';
import { CvInfoComponent } from '../cv-info/cv-info.component';
import { FormGroup } from '@angular/forms';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { EducationsComponent } from '../educations/educations.component';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { SkillsInfoComponent } from '../skills-info/skills-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import {
  CourseCertificate,
  CvCreate,
  DrivingCategory,
  Education,
  LanguageInfoInput,
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
import { ToastrService } from 'ngx-toastr';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicModel } from '../../../models';
import { NomenclatureService } from '../../../core/services';

@Component({
  selector: 'jf-create-cv',
  templateUrl: './create-cv.component.html'
})
export class CreateCvComponent implements AfterViewInit {

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

  countries!: Signal<BasicModel[]>;
  genderOptions!: Signal<BasicModel[]>;
  businessSectors!: Signal<BasicModel[]>;
  educationLevels!: Signal<BasicModel[]>;
  languageTypes!: Signal<BasicModel[]>;
  languageLevels!: Signal<BasicModel[]>;
  drivingCategories!: Signal<DrivingCategory[]>;

  cvModel: CvCreate = {} as CvCreate;

  constructor(
    private cdref: ChangeDetectorRef,
    private cvService: CurriculumVitaesService,
    private pDetailsService: PersonalDetailsService,
    private educationsService: EducationsService,
    private workExpService: WorkExperiencesService,
    private languagesService: LanguagesInfoService,
    private skillsService: SkillsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {
    this.getData();
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

  onPassedLanguagesInfo = (data: LanguageInfoInput[]): void => {
    this.cvModel.languagesInfo = data;
  }

  onPassedSkillsInfoData = (data: SkillsInfo): void => {
    this.cvModel.skills = data;
  }

  onPassedCoursesData = (data: CourseCertificate[]): void => {
    this.cvModel.courseCertificates = data;
  }

  sendCVdata = (): void => {
    this.cvService.create(this.cvModel)
      .subscribe(() => {
        this.toastr.success(`${this.cvModel.name} cv is successfully created.`);
        // TODO: redirect to all cvs
      });
  }

  private getData = (): void => {
    this.countries = toSignal(
      this.nomenclatureService.getCountries(),
      { initialValue: [] as BasicModel[] });
    this.genderOptions = toSignal(
      this.nomenclatureService.getGenderOptions(),
      { initialValue: [] as BasicModel[] });
    this.businessSectors = toSignal(
      this.workExpService.getBusinessSectors(),
      { initialValue: [] as BasicModel[] });
    this.educationLevels = toSignal(
      this.nomenclatureService.getEducationLevels(),
      { initialValue: [] as BasicModel[] });
    this.languageTypes = toSignal(
      this.nomenclatureService.getLanguageTypes(),
      { initialValue: [] as BasicModel[] });
    this.languageLevels = toSignal(
      this.nomenclatureService.getLanguageLevels(),
      { initialValue: [] as BasicModel[] });

    this.drivingCategories = signal<DrivingCategory[]>([] as DrivingCategory[]);
    // this.drivingCategories = toSignal(this.skillsService.getDrivingCategories(), { initialValue: [] as DrivingCategory[] });
  }
}

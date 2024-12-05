import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, Signal, signal } from '@angular/core';
import { CvInfoComponent } from '../cv-info/cv-info.component';
import { FormGroup } from '@angular/forms';
import { CoursesCertificatesComponent, EducationsComponent, LanguagesInfoComponent, PersonalDetailsComponent, SkillsInfoComponent, WorkExperiencesComponent } from '../index';
import { CourseCertificate, CvCreate, CvInfo, DrivingCategory, Education, EducationOutput, LanguageInfoInput, LanguageInfoOutput, PersonalDetails, PersonalDetailsOutput, SkillsInfo, WorkExperience, WorkExperienceOutput } from '../../models/cv';
import { CurriculumVitaesService } from '../../services';
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

  onPassedCvInfoData = (info: CvInfo): void => {
    this.cvModel.name = info.name;
    this.cvModel.pictureUrl = info.pictureUrl;
  };

  onPassedPersonalDetailsData = (data: PersonalDetails): void => {
    this.cvModel.personalDetails = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      genderId: data.gender as any,
      birthdate: data.birthdate,
      citizenshipId: data.citizenship as any,
      countryId: data.country as any,
      city: data.city
    } as PersonalDetailsOutput;
  }

  onPassedWorkExperiencesData = (data: WorkExperience[]): void => {
    this.cvModel.workExperiences = data.map((item: WorkExperience) => {
      return { ...item, businessSectorId: item.businessSector.id as any } as WorkExperienceOutput
    });
  }

  onPassedEducationData = (data: Education[]): void => {
    this.cvModel.educations = data.map((item: Education) => {
      return { ...item, educationLevelId: item.educationLevel as any } as EducationOutput
    });
  }

  onPassedLanguagesInfo = (data: LanguageInfoInput[]): void => {
    this.cvModel.languagesInfo = data.map((item: LanguageInfoInput) => {
      return {
        id: 0,
        languageTypeId: item.languageType.id,
        comprehensionLevelId: item.comprehensionLevel.id,
        speakingLevelId: item.speakingLevel.id,
        writingLevelId: item.writingLevel.id
      } as LanguageInfoOutput
    });
  }

  onPassedSkillsInfoData = (data: SkillsInfo): void => {
    this.cvModel.skills = data;
  }

  onPassedCoursesData = (data: CourseCertificate[]): void => {
    this.cvModel.courseCertificates = data;
  }

  sendCVdata = (): void => {
    this.cvService.create(this.cvModel)
      .subscribe({
        next: () => {
          this.toastr.success(`${this.cvModel.name} cv is successfully created.`);
          // TODO: redirect to all cvs
        },
        error: () => this.toastr.error('Sorry, Can not create the CV.')
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
      this.nomenclatureService.getBusinessSectors(),
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

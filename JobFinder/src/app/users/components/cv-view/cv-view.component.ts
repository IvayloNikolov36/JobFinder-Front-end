import { WorkExperiencesService } from './../../services/work-experiences.service';
import { LanguagesInfoService } from './../../services/languages-info.service';
import { PersonalDetailsService } from './../../services/personal-details.service';
import {
  Component,
  ComponentRef,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CoursesService, CurriculumVitaesService, EducationsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import { CourseSertificate, Education, LanguageInfo, PersonalDetails, WorkExperience } from '../../models/cv';
import { EducationsComponent } from '../educations/educations.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicValueModel } from '../../../core/models';
import { Modal } from 'bootstrap';
import { LanguagesInfoComponent } from '../languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../courses-certificates/courses-certificates.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';

@Component({
  selector: 'jf-cv-view',
  templateUrl: './cv-view.component.html'
})
export class CvViewComponent implements OnInit {

  @ViewChild('editCvSectionComponent', { read: ViewContainerRef }) cvSectionComponentRef!: ViewContainerRef;

  cvId: string;
  fullName!: string;
  cv!: CvListingData;
  showModal: boolean = false;
  editCvSectionTitle: string = '';
  createdComponentRef!: ComponentRef<any>;

  educationLevels!: Signal<BasicValueModel[]>;
  languageTypes!: Signal<BasicValueModel[]>;
  languageLevels!: Signal<BasicValueModel[]>;
  bussinessSectors!: Signal<BasicValueModel[]>;
  countries!: Signal<BasicValueModel[]>;

  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaesService,
    private educationsService: EducationsService,
    private languagesService: LanguagesInfoService,
    private coursesService: CoursesService,
    private workExperiencesService: WorkExperiencesService,
    private pDetailsService: PersonalDetailsService) {

    this.cvId = this.route.snapshot.params['id'];

    // TODO: refactor and think about how to avoid loading that data in every case
    this.educationLevels = toSignal(this.educationsService.getEducationLevels(), { initialValue: [] as BasicValueModel[] });
    this.languageTypes = toSignal(this.languagesService.getLanguageTypes(), { initialValue: [] as BasicValueModel[] });
    this.languageLevels = toSignal(this.languagesService.getLanguageLevels(), { initialValue: [] as BasicValueModel[] });
    this.bussinessSectors = toSignal(this.workExperiencesService.getBusinessSectors(), { initialValue: [] as BasicValueModel[] });
    this.countries = toSignal(this.pDetailsService.getCountries(), { initialValue: [] as BasicValueModel[] });
  }

  ngOnInit(): void {
    this.loadCvData();
  }

  editEducations = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Education section"
    modal.show();
    this.onCreateEducationModalComponent();
  }

  editLanguagesInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Languages info"
    modal.show();
    this.onCreateLanguagesInfoComponent();
  }

  editCoursesInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Courses info"
    modal.show();
    this.onCreateCoursesInfoComponent();
  }

  editWorkExperienceInfo = (modalElement: any): void => {
    const modal = new Modal(modalElement);
    this.editCvSectionTitle = "Edit Work Experience info"
    modal.show();
    this.onCreateWorkExperienceInfoComponent();
  }

  private onCreateWorkExperienceInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<WorkExperiencesComponent> = this.cvSectionComponentRef
      .createComponent(WorkExperiencesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: WorkExperiencesComponent = createdComponentRef.instance;
    component.businessSectors = this.bussinessSectors as InputSignal<BasicValueModel[]>;
    component.isEditMode = true;

    component.emitWorkExperiencesData
      .subscribe((data: WorkExperience[]) => {
        this.workExperiencesService.update(this.cv.id, data).subscribe(() => {
          this.cv.workExperiences = data;
          // TODO: add toaster and show success and also close the modal
        });
      });
  }

  private onCreateCoursesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<CoursesCertificatesComponent> = this.cvSectionComponentRef
      .createComponent(CoursesCertificatesComponent);

    this.createdComponentRef = createdComponentRef;

    const component: CoursesCertificatesComponent = createdComponentRef.instance;

    component.isEditMode = true;

    component.emitCoursesData
      .subscribe((data: CourseSertificate[]) => {
        this.coursesService.update(this.cv.id, data).subscribe(() => {
          this.cv.courseCertificates = data;
          // TODO: add toaster and show success and also close the modal
        });
      });
  }

  private onCreateLanguagesInfoComponent = (): void => {
    const createdComponentRef: ComponentRef<LanguagesInfoComponent> = this.cvSectionComponentRef
      .createComponent(LanguagesInfoComponent);

    this.createdComponentRef = createdComponentRef;

    const component: LanguagesInfoComponent = createdComponentRef.instance;

    component.isEditMode = true;
    component.languagesInfoData = this.cv.languagesInfo;
    component.languageTypes = this.languageTypes as InputSignal<BasicValueModel[]>;
    component.languageLevels = this.languageLevels as InputSignal<BasicValueModel[]>;

    component.emitLanguagesInfo
      .subscribe((data: LanguageInfo[]) => {
        this.languagesService.update(this.cv.id, data).subscribe(() => {
          // TODO: if new language is added it is with id 0 - find way to get the new id

          // TODO: set the BasicValueModel and cvId

          // const mappedData = data.map((item: LanguageInfo) => {
          //   const languageTypes = this.languageTypes();
          //   item.languageType = this.languageTypes().filter(lt => lt.value === item.languageType.value)[0];
          //   item.comprehension = this.languageLevels().filter(ll => ll.value === item.comprehension.value)[0];
          //   item.speaking = this.languageLevels().filter(ll => ll.value === item.speaking.value)[0];
          //   item.writing = this.languageLevels().filter(ll => ll.value === item.writing.value)[0];
          //   return item;
          // });
          // this.cv.languagesInfo = mappedData;


          // TODO: add toaster and show success and also close the modal
        });
      });
  }

  private onCreateEducationModalComponent = (): void => {
    const createdComponentRef: ComponentRef<EducationsComponent> = this.cvSectionComponentRef
      .createComponent(EducationsComponent);
    this.createdComponentRef = createdComponentRef;
    const component: EducationsComponent = createdComponentRef.instance;
    component.isEditMode = true;
    component.educationsData = this.cv.educations;
    component.educationLevels = this.educationLevels as InputSignal<BasicValueModel[]>;

    component.emitEducationData
      .subscribe((data: Education[]) => {
        this.educationsService.update(this.cv.id, data).subscribe(() => {
          this.cv.educations = data;
          // TODO: add toaster and show success and also close the modal
        });
      });
  }

  onCloseModal = (): void => {
    this.createdComponentRef.destroy();
  }

  private loadCvData = (): void => {
    this.cvService.getCvListingData(this.cvId)
      .subscribe((data: CvListingData) => {
        this.cv = data;
        const details: PersonalDetails = this.cv.personalDetails;
        this.fullName = `${details.firstName} ${details.middleName} ${details.lastName}`;
      });
  }
}

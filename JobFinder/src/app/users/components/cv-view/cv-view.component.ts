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
import { CurriculumVitaesService, EducationsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import { Education, PersonalDetails } from '../../models/cv';
import { EducationsComponent } from '../educations/educations.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicValueModel } from '../../../core/models';
import { Modal } from 'bootstrap';

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
  countries!: Signal<BasicValueModel[]>;

  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaesService,
    private educationsService: EducationsService,
    private pDetailsService: PersonalDetailsService) {

    this.cvId = this.route.snapshot.params['id'];

    // TODO: refactor and think about how to avoid loading that data in every case
    this.educationLevels = toSignal(
      this.educationsService.getEducationLevels(),
      { initialValue: [] as BasicValueModel[] }
    );

    this.countries = toSignal(
      this.pDetailsService.getCountries(),
      { initialValue: [] as BasicValueModel[] });
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

  onCreateEducationModalComponent = (): void => {
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

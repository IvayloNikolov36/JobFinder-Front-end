import { Component, OnInit } from '@angular/core';
import { CurriculumVitaesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CvListingData } from '../../models/cv/cv-listing-data';
import { PersonalDetails } from '../../models/cv';

@Component({
  selector: 'jf-cv-view',
  templateUrl: './cv-view.component.html'
})
export class CvViewComponent implements OnInit {

  cvId: string;
  fullName!: string;
  cv!: CvListingData;

  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaesService) {
    this.cvId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.cvService.getCvListingData(this.cvId)
        .subscribe((data: CvListingData) => {
          console.log(data);
          this.cv = data;
          const details: PersonalDetails = this.cv.personalDetails;
          this.fullName = `${details.firstName} ${details.middleName} ${details.lastName}`;
        });
  }
}

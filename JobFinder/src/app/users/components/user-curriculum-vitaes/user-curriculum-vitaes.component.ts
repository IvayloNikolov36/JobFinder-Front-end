import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurriculumVitaesService } from '../../services/curriculum-vitaes.service';
import { CvListing } from '../../models/cv';

@Component({
  selector: 'jf-user-curriculum-vitaes',
  templateUrl: './user-curriculum-vitaes.component.html'
})
export class UserCurriculumVitaesComponent implements OnInit {

  cvs$!: Observable<CvListing[]>;

  constructor(private cvService: CurriculumVitaesService) { }

  ngOnInit(): void {
    this.cvs$ = this.cvService.getUserCVs();
  }

  deleteCv(cvId: string): void {
    console.log(cvId);
  }
}

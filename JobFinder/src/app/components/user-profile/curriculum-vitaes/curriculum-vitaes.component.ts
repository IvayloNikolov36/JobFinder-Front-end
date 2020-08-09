import { CvListing } from './../../../core/models/cv/cv-listing';
import { Observable } from 'rxjs';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum-vitaes',
  templateUrl: './curriculum-vitaes.component.html',
  styleUrls: ['./curriculum-vitaes.component.css']
})
export class CurriculumVitaesComponent implements OnInit {
  cvs$: Observable<CvListing[]>;

  constructor(private cvService: CurriculumVitaesService) { }

  ngOnInit() {
    this.cvs$ = this.cvService.getUserCVs();
  }

}

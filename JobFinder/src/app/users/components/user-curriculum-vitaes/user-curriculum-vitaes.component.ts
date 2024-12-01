import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurriculumVitaesService } from '../../services/curriculum-vitaes.service';
import { CvListing } from '../../models/cv';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jf-user-curriculum-vitaes',
  templateUrl: './user-curriculum-vitaes.component.html'
})
export class UserCurriculumVitaesComponent implements OnInit {

  cvs$!: Observable<CvListing[]>;

  constructor(
    private cvService: CurriculumVitaesService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.cvs$ = this.cvService.getAllMine();
  }

  deleteCv(id: string, name: string): void {
    this.cvService.delete(id).subscribe(() => {
      this.toaster.success(`CV ${name} is deleted successfully.`);
    });
  }
}

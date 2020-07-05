import { DrivingCategory } from './../../../core/models/cv/driving-category';
import { Observable } from 'rxjs';
import { SelectOptionsType } from '../../../core/models/common/select-options-type';
import { CvCreate } from './../../../core/models/cv/cv-create';
import { WorkExperience } from './../../../core/models/cv/work-experience';
import { CourseSertificate } from './../../../core/models/cv/course-sertificate';
import { LanguageInfo } from './../../../core/models/cv/language-info';
import { Education } from './../../../core/models/cv/education';
import { SkillsInfo } from './../../../core/models/cv/SkillsInfo';
import { PersonalDetails } from './../../../core/models/cv/personal-details';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit, OnDestroy {
  cvData: object[];
  cvId: string;

  countriesSub;
  countries: SelectOptionsType[];
  businessSectorsSub;
  businessSectors: SelectOptionsType[];
  educationLevels$: Observable<SelectOptionsType[]>;
  languageTypes$: Observable<SelectOptionsType[]>;
  languageLevels$: Observable<SelectOptionsType[]>;
  drivingCategories$: Observable<DrivingCategory[]>;

  cvInfo: CvCreate;
  personalDetails: PersonalDetails;
  workExperiences: WorkExperience[];
  educations: Education[];
  languagesInfo: LanguageInfo[];
  skillsInfo: SkillsInfo;
  coursesCertificates: CourseSertificate[];

  constructor(private cvService: CurriculumVitaesService) {

   }

  ngOnInit() {
    this.countriesSub = this.cvService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.businessSectorsSub = this.cvService.getBusinessSectors().subscribe((data) => {
      this.businessSectors = data;
    });

    this.educationLevels$ = this.cvService.getEducationLevels();
    this.languageTypes$ = this.cvService.getLanguageTypes();
    this.languageLevels$ = this.cvService.getLanguageLevels();
    this.drivingCategories$ = this.cvService.getDrivingCategories();
  }

  ngOnDestroy() {
    this.countriesSub.unsubscribe();
    this.businessSectorsSub.unsubscribe();
  }

  onPassedCvInfoData(data: CvCreate) {
    this.cvInfo = data;
  }

  onPassedPersonalDetailsData(data: PersonalDetails) {
    this.personalDetails = data;
  }

  onPassedWorkExperiencesData(data: WorkExperience[]) {
    this.workExperiences = data;
  }

  onPassedEducationData(data: Education[]) {
    this.educations = data;
  }

  onPassedLanguagesInfo(data: LanguageInfo[]) {
    this.languagesInfo = data;
  }

  onPassedSkillsInfoData(data: SkillsInfo) {
    this.skillsInfo = data;
  }

  onPassedCoursesData(data: CourseSertificate[]) {
    this.coursesCertificates = data;
  }

  sendCVdata() {
    this.cvService.createCv(this.cvInfo).subscribe((data) => {
      this.cvId = data['cvId'];
      this.cvService.createPersonalDetails(this.cvId, this.personalDetails).subscribe();
      this.cvService.createWorkExperiences(this.cvId, this.workExperiences).subscribe();
      this.cvService.createEducations(this.cvId, this.educations).subscribe();
      this.cvService.createLanguages(this.cvId, this.languagesInfo).subscribe();
      this.cvService.createSkills(this.cvId, this.skillsInfo).subscribe();
      this.cvService.createCourses(this.cvId, this.coursesCertificates).subscribe();
    });
  }

}

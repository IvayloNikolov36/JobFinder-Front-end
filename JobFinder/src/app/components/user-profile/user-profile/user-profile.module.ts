import { CvPartComponent } from './../cv-details/cv-details-children/cv-part/cv-part.component';
import { CoursesService } from './../../../core/services/cv-services/courses.service';
import { SkillsService } from './../../../core/services/cv-services/skills.service';
import { EducationsService } from './../../../core/services/cv-services/educations.service';
import { MaterialModule } from './../../../material.module';
import { CvInfoComponent } from './../create-cv/child-components/cv-info/cv-info.component';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCvComponent } from './../create-cv/create-cv.component';
import { CurriculumVitaesComponent } from './../curriculum-vitaes/curriculum-vitaes.component';
import { UserAccountComponent } from './../user-account/user-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from '../create-cv/child-components/skills/skills.component';
import { PersonalDetailsComponent } from '../create-cv/child-components/personal-details/personal-details.component';
import { EducationComponent } from '../create-cv/child-components/educations/educations.component';
import { LanguagesInfoComponent } from '../create-cv/child-components/languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../create-cv/child-components/courses-certificates/courses-certificates.component';
import { WorkExperiencesComponent } from '../create-cv/child-components/work-experiences/work-experiences.component';
import { CvDetailsComponent } from '../cv-details/cv-details.component';
import { PersonalDetailsService } from 'src/app/core/services/cv-services/personal-details.service';
import { WorkExperiencesService } from 'src/app/core/services/cv-services/work-experiences.service';
import { LanguagesInfoService } from 'src/app/core/services/cv-services/languages-info.service';
import { CvTabsListComponent } from '../cv-details/cv-details-children/cv-tabs-list/cv-tabs-list.component';

const routes: Routes = [
  { path: '', component: UserAccountComponent },
  { path: 'cvs', component: CurriculumVitaesComponent },
  { path: 'cvs/create', component: CreateCvComponent },
  { path: 'cvs/details/:id', component: CvDetailsComponent },
];

@NgModule({
  declarations: [
    UserAccountComponent,
    CurriculumVitaesComponent,
    CreateCvComponent,
    PersonalDetailsComponent,
    SkillsComponent,
    EducationComponent,
    LanguagesInfoComponent,
    CoursesCertificatesComponent,
    CvInfoComponent,
    WorkExperiencesComponent,
    CvDetailsComponent,
    CvTabsListComponent,
    CvPartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CurriculumVitaesService,
    PersonalDetailsService,
    WorkExperiencesService,
    EducationsService,
    LanguagesInfoService,
    SkillsService,
    CoursesService
  ],
})
export class UserProfileModule { }

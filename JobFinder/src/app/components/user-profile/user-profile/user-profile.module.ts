import { CvInfoComponent } from './../create-cv/child-components/cv-info/cv-info.component';
import { CurriculumVitaesService } from './../../../core/services/curriculum-vitaes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCvComponent } from './../create-cv/create-cv.component';
import { CurriculumVitaesComponent } from './../curriculum-vitaes/curriculum-vitaes.component';
import { UserAccountComponent } from './../user-account/user-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
} from '@angular/material';
import { SkillsComponent } from '../create-cv/child-components/skills/skills.component';
import { PersonalDetailsComponent } from '../create-cv/child-components/personal-details/personal-details.component';
import { EducationComponent } from '../create-cv/child-components/educations/educations.component';
import { LanguagesInfoComponent } from '../create-cv/child-components/languages-info/languages-info.component';
import { CoursesCertificatesComponent } from '../create-cv/child-components/courses-certificates/courses-certificates.component';
import { WorkExperiencesComponent } from '../create-cv/child-components/work-experiences/work-experiences.component';

const routes: Routes = [
  { path: '', component: UserAccountComponent },
  { path: 'cvs', component: CurriculumVitaesComponent },
  { path: 'cvs/create', component: CreateCvComponent },
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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CurriculumVitaesService,
  ],
  exports: [
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ]
})
export class UserProfileModule { }

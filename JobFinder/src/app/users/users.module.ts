import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserCurriculumVitaesComponent } from './components/user-curriculum-vitaes/user-curriculum-vitaes.component';
import { CvInfoComponent } from './components/cv-info/cv-info.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { WorkExperiencesComponent } from './components/work-experiences/work-experiences.component';
import { EducationsComponent } from './components/educations/educations.component';
import { LanguagesInfoComponent } from './components/languages-info/languages-info.component';
import { SkillsInfoComponent } from './components/skills-info/skills-info.component';
import { CoursesCertificatesComponent } from './components/courses-certificates/courses-certificates.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    CreateCvComponent,
    UserAccountComponent,
    UserCurriculumVitaesComponent,
    CvInfoComponent,
    PersonalDetailsComponent,
    WorkExperiencesComponent,
    EducationsComponent,
    LanguagesInfoComponent,
    SkillsInfoComponent,
    CoursesCertificatesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class UsersModule { }

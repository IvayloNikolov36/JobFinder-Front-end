import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CollapseDirective } from './core/directives/collapse.directive';
import { DropdownDirective } from './core/directives/dropdown.directive';
import { CreateJobAdvertisementComponent } from './create-job-advertisement/create-job-advertisement.component';
import { JobAdvertisementsComponent } from './job-advertisements/job-advertisements.component';
import { PaginationComponent } from './pagination/pagination.component';
import { JobAdvertisementDetailsComponent } from './job-advertisement-details/job-advertisement-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { UsersModule } from './users/users.module';
import { ResponseHandlerInterceptorService } from './core/interceptors/response-handler-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    NavbarComponent,
    CollapseDirective,
    DropdownDirective,
    CreateJobAdvertisementComponent,
    JobAdvertisementsComponent,
    PaginationComponent,
    JobAdvertisementDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    UsersModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

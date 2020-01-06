import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { RecruitmentOffersModule } from './components/recruitment-offers/recruitment-offers.module';
import { AuthService } from './core/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterUserComponent } from './components/authentication/register-user/register-user.component';
import { RegisterCompanyComponent } from './components/authentication/register-company/register-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ResponseHandlerInterceptorService } from './core/interceptors/response-handler-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownDirective } from './components/shared/navigation/dropdown.directive';
import { CollapseDirective } from './components/shared/navigation/collapse.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    NavigationComponent,
    HomeComponent,
    DropdownDirective,
    CollapseDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

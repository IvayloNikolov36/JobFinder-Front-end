import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/core/must-match';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
      this.form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  register() {
    this.authService
      .registerUser(this.form.value)
      .subscribe((data) => {
        this.router.navigate(['/login']);
      });
  }

  get f() {
    return this.form.controls;
  }
}

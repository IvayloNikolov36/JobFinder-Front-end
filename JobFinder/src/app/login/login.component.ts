import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'jf-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit = (form: FormGroup) => {
    if (form.valid) {
      this.login();
    }
  }

  login() {
    this.authService
      .login(this.form.value)
      .subscribe((data: any) => {
        const token = data['token'];
        localStorage.setItem('token', token);

        const name = data['username'];
        localStorage.setItem('username', name);

        const isAdmin = data['role'] === 'Admin' ? true : false;
        localStorage.setItem('isAdmin', String(isAdmin));

        const isCompany = data['role'] === 'Company' ? true : false;
        localStorage.setItem('isCompany', String(isCompany));

        this.router.navigate(['/home']);
      });
  }
}

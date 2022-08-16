import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isEmployeeForm = false;
  isAuthError = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public getUserIdHint() {
    return 'Eg. ' + (this.isEmployeeForm ? '15080000' : '15082000');
  }

  public switchForm() {
    this.isEmployeeForm = !this.isEmployeeForm;
  }

  public submitForm(form: NgForm) {
    let role: string = this.isEmployeeForm ? 'EMPLOYEE' : 'CUSTOMER';
    let userId: string = form.value['userId'];
    let password: string = form.value['password'];

    // form.reset();

    // create user
    let user = {
      userId: userId,
      password: password,
      role: role,
    };

    // call login function of auth-service
    this.authService.login(user).subscribe({
      next: (appUser) => {
        console.log(appUser);

        // save auth token in local storage
        window.localStorage.setItem('token', appUser.authToken);

        // save userId in local storage
        window.localStorage.setItem('userId', appUser.userId);

        // save name in local storage
        window.localStorage.setItem('name', appUser.name);

        // set authenticated to true
        this.authService.isAuthenticated.next(true);

        // navigate to dashboard
        this.router.navigate([
          this.isEmployeeForm ? '/employeeDashboard' : '/customerDashboard',
        ]);
      },
      error: (error: any) => {
        // set auth error to true
        this.isAuthError = true;

        // set authenticated to false
        this.authService.isAuthenticated.next(false);

        // set error message
        this.errorMessage = 'Username/Password is incorrect... Please check';
      },
    });
  }
}

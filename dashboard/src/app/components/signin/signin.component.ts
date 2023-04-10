import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup ,FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import {ErrorStateMatcher} from '@angular/material/core';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errors:any = null;

  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  
  matcher = new MyErrorStateMatcher(); // Controllo errori material
  hide = true; // Campo password
  loading = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {

    token.isLoggedIn() ? router.navigate(['dashboard']) : ''; // se sono loggato rimanda alla dashboard

    this.loginForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  ngOnInit() {}
  
  onSubmit() {
    this.loading = true;
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
        this.loading = false;
      },
      (error) => {
        this.errors = error.error;
        this.loading = false;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
        this.loading = false;
      }
    );
  }


  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }


}

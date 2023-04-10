import { Component, KeyValueDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  registerForm: FormGroup;
  errors: any = null;

  nomeFormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confermaPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)])

  matcher = new MyErrorStateMatcher(); // Controllo errori material
  hide = true; // Campo password
  loading :boolean = false;


  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private token : TokenService,
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {

    token.isLoggedIn() ? router.navigate(['dashboard']) : '';

    this.registerForm = this.fb.group({
      name: this.nomeFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      password_confirmation: this.confermaPasswordFormControl,

    }, { validators: this.passwordMatchingValidatior });
  }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        this.loading = false;
      
        this.openSnackBar(result.message)
      },
      (error) => {
        this.loading = false;
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.loading = false;
        this.router.navigate(['login']);
      }
    );
  }

  passwordMatchingValidatior(form: FormGroup): null {
    const password = form.controls['password'].value;
    const confirmation = form.controls['password_confirmation'].value;

    if (!password || !confirmation) { // if the password or confirmation has not been inserted ignore
      return null;
    }

    if (confirmation.length > 0 && confirmation !== password) {
      confirmation.setErrors({ notMatch: true }); // set the error in the confirmation input/control
    }

    return null; // always return null here since as you'd want the error displayed on the confirmation input
  }

  openSnackBar(message :any) {
    this._snackBar.open(message, 'Chiudi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

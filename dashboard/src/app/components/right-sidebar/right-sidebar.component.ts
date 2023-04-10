import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, animate, style, group, query, transition } from '@angular/animations';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, NG_VALUE_ACCESSOR , ControlValueAccessor } from '@angular/forms';
import { SnackBarService } from 'src/app/elements/snack-bar/snack-bar.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { AuthService } from 'src/app/shared/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-right-sidebar',
  animations: [
    trigger('rs_open', [
      state('true', style({ right: '0px' })),
      state('false', style({ right: '-400px' })),
      transition('true <=> false', animate(300))
    ]),
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})

export class RightSidebarComponent implements OnInit {

  @Input() info: any;
  
  loading :boolean = false;
  matcher = new MyErrorStateMatcher(); // Controllo errori material
  editUserForm: FormGroup;
  image : any = null;
  hide = true; // Campo password

  constructor(
    public fb: FormBuilder, 
    private http : HttpClient,
    private snackBar : SnackBarService,
    public userProfile : UserProfileService,
    private auth : AuthService,
    ) {
      
    this.editUserForm = fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      originEmail: new FormControl('', [Validators.required, Validators.email]),
      image:null,
      password : new FormControl('', [Validators.minLength(8)]),
      confermaPassword: new FormControl('' , [Validators.minLength(8)]),
    })
  }

  ngOnInit() {
    if(this.userProfile.user) {
      this.editUserForm.get('name')?.setValue(this.userProfile.user.name);
      this.editUserForm.get('email')?.setValue(this.userProfile.user.email);
      this.editUserForm.get('originEmail')?.setValue(this.userProfile.user.email);
    }
  }

  uploadFile(event : Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.image = file;
    this.editUserForm.patchValue({
      image: file,
    });
  }

  editUser() {
    this.loading=true;

    const formData: any = new FormData();

    formData.append("foto" , this.editUserForm.controls['image'].value);
    formData.append("email" , this.editUserForm.controls['email'].value);
    formData.append('name' , this.editUserForm.controls['name'].value);
    formData.append('originEmail' , this.editUserForm.controls['originEmail'].value);// dato utilizzato per cercare l'utente al posto del ID - 
    formData.append('password' , this.editUserForm.controls['password'].value);
    formData.append('conferma_password' , this.editUserForm.controls['confermaPassword'].value);
    
    this.http.post(this.auth.base_path + "/edit-user" , formData , this.auth.httpOptions).subscribe(data => {
      this.snackBar.openSnackBar(data);
      this.userProfile.getLoggedUser();
      this.loading = false;
      this.userProfile.rs_open_close();
    })
  }

}

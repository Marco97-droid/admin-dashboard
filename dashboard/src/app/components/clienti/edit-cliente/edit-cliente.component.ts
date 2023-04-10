import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, style, group, query, transition } from '@angular/animations';
import { ClientiService } from '../clienti.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, NG_VALUE_ACCESSOR , ControlValueAccessor } from '@angular/forms';
import { SnackBarService } from 'src/app/elements/snack-bar/snack-bar.service';
import { AuthService } from 'src/app/shared/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-edit-cliente',
  animations: [
    trigger('rs_open', [
      state('true', style({ right: '0px' })),
      state('false', style({ right: '-400px' })),
      transition('* <=> *', [animate('0.3s')])
    ]),
  ],
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})






export class EditClienteComponent implements OnInit {

  @Input() cliente: any;
  editCustomerForm: FormGroup;
  matcher = new MyErrorStateMatcher(); // Controllo errori material
  image: any = null;
  errors:any = null;

  open: boolean = false;
  loading: boolean = false;

  constructor(
    public clienti: ClientiService,
    public fb : FormBuilder,
    private http : HttpClient,
    private snackBar: SnackBarService,
    private auth:AuthService,
    ) {

  }

  ngOnInit(): void {

    this.editCustomerForm = this.fb.group( {
      image:null,
      ragione_sociale: new FormControl(this.cliente.ragione_sociale , [Validators.required]),
      partita_iva: new FormControl(this.cliente.partita_iva , [Validators.required]),
      indirizzo : new FormControl(this.cliente.indirizzo),
      provincia : new FormControl(this.cliente.provincia),
      cap: new FormControl(this.cliente.cap),
      citta: new FormControl(this.cliente.citta),
      stato: new FormControl(this.cliente.stato),
      latitudine: new FormControl(this.cliente.latitudine),
      longitudine: new FormControl(this.cliente.longitudine),
      id: new FormControl(this.cliente.id),
    });

  }


  editCustomer() {
    this.loading = true;

    const formData = new FormData();
    formData.append("logo" , this.editCustomerForm.controls['image'].value);
    formData.append("ragione_sociale" , this.editCustomerForm.controls['ragione_sociale'].value);
    formData.append("partita_iva" , this.editCustomerForm.controls['partita_iva'].value);
    formData.append("indirizzo" , this.editCustomerForm.controls['indirizzo'].value);
    formData.append("provincia" , this.editCustomerForm.controls['provincia'].value);
    formData.append("cap" , this.editCustomerForm.controls['cap'].value);
    formData.append("citta" , this.editCustomerForm.controls['citta'].value);
    formData.append("stato" , this.editCustomerForm.controls['stato'].value);
    formData.append("latitudine" , this.editCustomerForm.controls['latitudine'].value);
    formData.append("longitudine" , this.editCustomerForm.controls['longitudine'].value);
    formData.append("id" , this.editCustomerForm.controls['id'].value);

    this.http.post(this.auth.base_path + '/customer-edit' , formData , this.auth.httpOptions).subscribe( 
      (data) => {
        console.log("data");
        console.log(data);
        this.loading = false;
      },
      (error) => {
        this.errors = error.error.errors;
        console.log("error");
        console.log(this.errors);
        this.loading = false;
      }
    )
    
  }

  uploadFile(event : Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.image = file;
    this.editCustomerForm.patchValue({
      image: file,
    });
  }


}

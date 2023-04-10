import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  user: any = null;
  rs_open : boolean = false;

  constructor(
    private http : HttpClient,
    public router : Router,
    public auth : AuthStateService,
    public token: TokenService,
  ) { 
    this.getLoggedUser();
  }


  getLoggedUser() {
    this.user = null;
    this.http.post<any>("http://localhost:8000/api/auth/log-user" , {}).subscribe(data => {

      if(Object.keys(data).length == 0) {
        this.signOut();
      } else {
        this.user = data;
      }
    })
  }

  rs_open_close() {
    this.rs_open = !this.rs_open;
  }

    //Logout
    signOut() {
      this.auth.setAuthState(false);
      this.token.removeToken();
      this.router.navigate(['login']);
    }

}

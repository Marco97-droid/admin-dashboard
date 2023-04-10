import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from './../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(
    private app: AppComponent,
    public authService: AuthService,
    private http: HttpClient,
    public auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public userProfile : UserProfileService
  ) {
    
  }


  open_close_sidenav() {
    this.app.opened = !this.app.opened;
  }

  ngOnInit() {
    this.userProfile.getLoggedUser();
  }

  

}

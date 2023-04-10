import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { trigger, state, animate, style, group, query, transition } from '@angular/animations';
import { UserProfileService } from './user-profile.service';



@Component({
  selector: 'app-user-profile',
  animations: [
    trigger('rs_open', [
      state('true', style({ right: '0px' })),
      state('false', style({ right: '-400px' })),
      transition('false <=> true', animate(300))
    ]),
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  info = {
    pagina :"Profilo",
    descrizione : "Gestisci il tuo profilo",
    icona : "user",
    slug : 'profile'
  };

  constructor(
    public authService: AuthService,
    public http : HttpClient,
    public userProfile : UserProfileService,

    ) {
   
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  base_path: String = 'http://localhost:8000';

  constructor(
    public router : Router , 
    route : ActivatedRoute)  {
      //console.log("router: " + router.url);
      //console.log("route: " + route);
  }

  ngOnInit(): void {
    
    //console.log("router: " + this.router.url);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent{

  info = {
    pagina :"Dashboard",
    descrizione : "Riepilogo generale di tutte le informazioni",
    icona : "grid"
  };  

}

import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-heading-pagina',
  templateUrl: './heading-pagina.component.html',
  styleUrls: ['./heading-pagina.component.css']
})
export class HeadingPaginaComponent {

  @Input('info') info : any;

  constructor() {
   
  }
}

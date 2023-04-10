import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { trigger, state, animate, style, group, query, transition } from '@angular/animations';
import { ClientiService } from './clienti.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})

export class ClientiComponent{

  info = {
    pagina :"Clienti",
    descrizione : "Gestione di tutti i clienti",
    icona : "briefcase"
  }; 

  displayedColumns: string[] = ['id', "logo", 'ragione_sociale', 'partita_iva', 'indirizzo', 'citta' , 'cap' , 'posizione', 'azioni',];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  cliente:any = "";
  
  constructor(
    public clienti : ClientiService,
  ) {
    clienti.getCustomers().then(() => {
      this.dataSource = new MatTableDataSource(clienti.clienti);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCliente(id:number) {
    this.cliente = Array.prototype.find.call(this.clienti.clienti, (x) => x.id === id);
    this.clienti.rs_open_close();
  }

}

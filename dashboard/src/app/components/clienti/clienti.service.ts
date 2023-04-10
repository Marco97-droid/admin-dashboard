import { Injectable , ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
export class ClientiService   {

  base_path:String = 'http://localhost:8000/api/auth';
  rs_open:boolean = false;
  clienti:any;

  constructor(
    private http : HttpClient
  ) {
    this.getCustomers();
   }

    async getCustomers() {
      this.clienti = await<any> this.http.post(this.base_path + '/customers' , {}).toPromise()
    }

    rs_open_close(){
      this.rs_open = !this.rs_open;
    }



}

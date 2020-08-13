import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: [
  ]
})
export class PaymentDetailListComponent implements OnInit {

  // dataTable: any;
  // dtOptions: any;
  // tableData = [];
  // @ViewChild('dataTable', {static: true}) table;

  constructor(public service:PaymentDetailService,
    private toaster:ToastrService) {
      // this.dataSource = new MatTableDataSource(this.service.GetList());
     }
     ngOnInit(){
  }

 
    
    //   this.service.GetList().subscribe((data ) => {
    //   this.tableData = data ;
    //   // this.dtOptions = {
    //   //   data : this.tableData,
    //   //   // columns: [
    //   //   //   {title: 'Owner Name', data: 'CardOwnerName'},
    //   //   //   {title: 'Card Number', data: 'CardNumber'},
    //   //   //   {title: 'Expiration Date', data: 'ExpirationDate'},
    //   //   //   {title: 'Action', data: null},
          
    //   //   // ]
    //   // };
    // }, err => {}, () => {
    //   this.dataTable = $(this.table.nativeElement);
    //   this.dataTable.DataTable(this.dtOptions);
    // });

}


 






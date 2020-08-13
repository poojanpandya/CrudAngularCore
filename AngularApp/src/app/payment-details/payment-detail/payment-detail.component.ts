import { Component, OnInit,Inject, Input, ViewChild } from '@angular/core';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { States } from 'src/app/shared/state.model';
import { Cities } from 'src/app/shared/city.model';
import { PaymentDetailListComponent } from '../payment-detail-list/payment-detail-list.component';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: [
  ],
  providers: [PaymentDetailListComponent]
})
export class PaymentDetailComponent implements OnInit {
  displayedColumns = ['CardOwnerName', 'CardNumber', 'ExpirationDate','symbol'];
  Array:PaymentDetail[]=[];
  dataSource: MatTableDataSource<PaymentDetail>;
  // listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input()checked: Boolean 

  // Statelist : Promise<void>;
  Cities:Cities[];
  public gender: any;
  states: States[];

  constructor(public service:PaymentDetailService,private comp: PaymentDetailListComponent ,
    private toaster:ToastrService) { 
      // this.dataSource = new MatTableDataSource<PaymentDetail>();
      this.gender = {
        array: [{
          id: 1,
          value: 'Male'
        },
        {
          id: 2,
          value: 'Female'
        }]
      }
    }
       
  // countrylist: any = []
  ngOnInit(): void {
    this.resetForm();
    this.service.CountryList();
    this.RefreshList();
  
  }

  RefreshList()
  {
    this.service.GetList().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
  });
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      PMId :0,
      CardOwnerName:'',
      CardNumber:'',
      ExpirationDate:'',
      CVV:'',
      CountryId :0,
      StateId :0,
      CityId :0,
      Gender:0,
      Address:'',
    }
  }

  onSubmit(form:NgForm){
    this.service.formData.CountryId = parseInt(this.service.formData.CountryId.toString());
    this.service.formData.StateId =parseInt(this.service.formData.StateId.toString());
    this.service.formData.CityId = parseInt(this.service.formData.CityId.toString());
    this.service.formData.Gender =parseInt(this.service.formData.Gender.toString());
    if(this.service.formData.PMId === 0)
    {
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm)
  {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toaster.success('Submitted successfully','Payment Detail Register');
        this.RefreshList();
      },
      err=>{
        console.log(err)
      }
  );
  }

  updateRecord(form:NgForm)
  {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);  
        this.toaster.info('Updated successfully','Payment Detail Register');
        this.RefreshList();
      },
      err=>{
        console.log(err)
      }
  ); 
  }

  populateForm(pd:PaymentDetail)
  {
    this.service.GetState(pd.CountryId);
    this.service.GetCity(pd.StateId);
    this.service.formData = Object.assign({},pd);
  } 
  
   public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  onDelete(PMId)
  {
    if(confirm('Are you sure to delete this record ?'))
    {
    this.service.deletePaymentDetail(PMId)
    .subscribe(
      res=>{
        this.RefreshList();
        this.toaster.warning('Deleted successfully','Payment Detail Register');
      },
      err=>{
        console.log(err);
      }
    )
  }
}
}

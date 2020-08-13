import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { Countries } from './country.model';
import { States } from './state.model';
import { Cities } from './city.model';
import {HttpClient,HttpErrorResponse } from "@angular/common/http"

import { map, filter, tap,catchError } from "rxjs/operators";

 import {Observable,throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData:PaymentDetail;
  readonly rootURL = "http://localhost:51893/api";
  list : PaymentDetail[];
  Countrylist : Countries[];
  Statelist=[];
  Citylist=[];
  states: States[];
  Cities:Cities[];


  constructor(private http:HttpClient) {   
    //Bind States
    this.getStates().subscribe(
      data => {
        this.states = data;
      }
    );
    

     //Bind Cities
     this.getCities().subscribe(
      data => {
        this.Cities = data;
      }
    );
}

  postPaymentDetail()
  {
   return this.http.post(this.rootURL+'/PaymentDetail',this.formData);
  }
  putPaymentDetail()
  {
   return this.http.put(this.rootURL+'/PaymentDetail/'+ this.formData.PMId,this.formData);
  }
  deletePaymentDetail(id)
  {
   return this.http.delete(this.rootURL+'/PaymentDetail/'+ id);
  }

  refreshList()
  {
     this.http.get(this.rootURL+'/PaymentDetail')
    .toPromise()
    .then(res=> this.list = res as PaymentDetail[]);
  }
   
  CountryList()
  {
    this.http.get(this.rootURL+'/GetCountries')
    .toPromise()
    .then(res=> this.Countrylist = res as Countries[]);
  }

  GetState(CountryId: any) {
    if (this.states.length >= 0)
    {
      this.Statelist = this.states.filter((item) => item.CountryId == CountryId);
    } 
  }

  GetCity(StateId: any) {
    if (this.Cities.length >= 0)
    {
      this.Citylist = this.Cities.filter((item) => item.StateId == StateId);
    } 
  }

  GetList()
  {
    return this.http.get<PaymentDetail[]>(this.rootURL+'/PaymentDetail')
   .pipe(
    catchError(this.handleError)
  );
  }



//   StateList()
//   {
//     return this.http.get<States[]>(this.rootURL+'/GetStates')
//     .toPromise()
//     .then(res=> this.Statelist = res as States[]);
  
//  }

 getStates() {
  return this.http.get<States[]>(this.rootURL+'/GetStates').pipe(
    catchError(this.handleError)
  );
}
getCities() {
  return this.http.get<Cities[]>(this.rootURL+'/GetCities').pipe(
    catchError(this.handleError)
  );
}


  // CityList()
  // {
  //   return this.http.get<Cities[]>(this.rootURL+'/GetCities')
  //   .toPromise()
  //   .then(res=> this.Citylist = res as Cities[]);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}



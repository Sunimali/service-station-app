import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Router } from '@angular/router';
import { Payment } from './payment.model.';


@Injectable({ providedIn: "root" })
export class PaymentService {

  private payment: Payment[] = [];
  private paymentUpdated = new Subject<Payment[]>();


  constructor(private http: HttpClient ,private router: Router) {}

  addPayment(packCharges:string,oil: string, airfilttering: string,additional:string,total:string,appid:string) {
    const payment: Payment = { id: null,packCharges:packCharges, oil:oil, airfiltering:airfilttering,additional:additional,total:total,appid:appid};
    console.log(payment);
    this.http
      .post<{ message: string, payid: string }>("http://localhost:3000/api/payment", payment)
      .subscribe(responseData => {
        const id = responseData.payid;
        console.log("id:"+id);
        payment.id = id;
        this.payment.push(payment);
        this.paymentUpdated.next([...this.payment]);
      });
  }
  
}

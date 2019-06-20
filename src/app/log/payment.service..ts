import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Router } from '@angular/router';
import { Payment } from './payment.model.';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: "root" })
export class PaymentService {
 

  private payments: Payment[] = [];
  private paymentUpdated = new Subject<Payment[]>();


  constructor(private http: HttpClient ,private router: Router) {}

  getLogItems(){

    this.http
      .get<{ message: string; payments: any }>(
        "http://localhost:3000/api/log"
      )
      .pipe(map((paymentData) => {
        return paymentData.payments.map(payment => {
          return {
            packCharges: payment.packCharges,
            oil: payment.vehicle,
            airfiltering: payment.date,
            additional: payment.time,
            total: payment.package,
            appid: payment.staffid,
            id: payment._id
          };
      
        });
      }))
      .subscribe(transformedPay => {
        this.payments = transformedPay;
        this.paymentUpdated.next([...this.payments]);
        
      });

  }

  getPaymentUpdateListener() {
    return this.paymentUpdated.asObservable();
  }


  addPayment(packCharges:string,oil: string, airfilttering: string,additional:string,total:string,appid:string) {
    const payment: Payment = { id: null,packCharges:packCharges, oil:oil, airfiltering:airfilttering,additional:additional,total:total,appid:appid};
    console.log(payment);
    this.http
      .post<{ message: string, payid: string }>("http://localhost:3000/api/payment", payment)
      .subscribe(responseData => {
        const id = responseData.payid;
        console.log("id:"+id);
        payment.id = id;
        this.payments.push(payment);
        this.paymentUpdated.next([...this.payments]);
      });
  }
  
}

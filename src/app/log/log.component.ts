import { Component, OnInit } from '@angular/core';

import { LogService } from '../service/log.service';
import { LogItem } from '../interface/logItem.interface';
import { PaymentService } from './payment.service.';
import { Payment } from './payment.model.';
import { VehicleAppointmentService } from '../vehicle-appointment/vehicle-appointment.service';
import { Appointment } from '../vehicle-appointment/appointment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  payments : Payment [] = [];
  selectedpayment : Payment;
  appointments:Appointment[] = [];
  selectedappointment:Appointment;
  isViewClicked: boolean = false;
  itemClicked:number;
  private postsSub: Subscription;

  constructor(private paymentservice:PaymentService,private appointmentService:VehicleAppointmentService) {

  }

  ngOnInit() {
    this.paymentservice.getLogItems();
    this.postsSub = this.paymentservice
      .getPaymentUpdateListener()
      .subscribe((payments: Payment[]) => {
        this.payments = payments;
      });
  

    this.appointmentService.getAppointments
    this.postsSub = this.appointmentService
      .getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
      });
  }

  onViewDetail(i:number){
   
    this.isViewClicked=true;
    this.selectedpayment = this.payments[i];
    this.appointments.forEach(app => {
      if(app.id==this.selectedpayment.appid){
        this.selectedappointment = app;
      }
    });
  }

  onDoneClicked(){
    this.isViewClicked =false;
  }

}

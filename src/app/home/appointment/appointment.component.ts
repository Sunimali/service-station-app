import { Component, OnInit } from '@angular/core';

import { AppointmentService } from "../../service/appointment.service";

import { AppointmentDetail } from "../../interface/appointmentDetail.interface";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  appointmentDetails : AppointmentDetail[];

  constructor(private appointmentService : AppointmentService) {
    this.appointmentDetails = appointmentService.getAppointmentDetails();
   }

  ngOnInit() {
  }

}

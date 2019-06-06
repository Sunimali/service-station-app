import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Appointment } from "./appointment.model";
import { Router } from '@angular/router';
import { StaffService } from '../staff/staff.service';


@Injectable({ providedIn: "root" })
export class VehicleAppointmentService {
  private appointments: Appointment[] = [];
  private appointmentUpdated = new Subject<Appointment[]>();

  constructor(private http: HttpClient ,private router: Router,private staffService:StaffService) {}

  getAppointments() {
    
    this.http
      .get<{ message: string; appointments: any }>(
        "http://localhost:3000/api/appointment"
      )
      .pipe(map((AppointmentData) => {
        return AppointmentData.appointments.map(appointment => {
          return {
            owner: appointment.owner,
            vehicle: appointment.vehicle,
            date: appointment.date,
            time: appointment.time,
            package: appointment.packg,
            staffid: appointment.staffid,
            id: appointment._id
          };
        });
      }))
      .subscribe(transformedApp => {
        this.appointments = transformedApp;
        this.appointmentUpdated.next([...this.appointments]);
      });
      
  }

  getAppointmentUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }

  

  getappointment(appId: string) {
    return this.http.get<{ _id: string; name: string; mobile: string; date: string;time: string}>(
      "http://localhost:3000/api/appointment/" + appId
    );
  }

  declineAppointment(appId: string) {
    const id = this.appointments[appId].id;
    console.log(id);
    this.http.delete("http://localhost:3000/api/appointment/" + id)
      .subscribe(() => {
        const updatedAppointment = this.appointments.filter(app => app.id !== id);
        this.appointments = updatedAppointment;
        this.appointmentUpdated.next([...this.appointments]);
      });
      this.router.navigate(["/appointment"]);
  }
  acceptAppointment(id: string, owner: string, vehicle: string, date: Date,time: string, packg:string,staffid:string,accpted:boolean) {
    const appointment: Appointment = { id: id, owner: owner, vehicle: vehicle, date:date,time:time ,package:packg,staffid:staffid,accepted:true};
    this.http
      .put("http://localhost:3000/api/appointment/" + id, appointment)
      .subscribe(response => {
        const updatedAppointment = [...this.appointments];
        const oldAppIndex = updatedAppointment.findIndex(p => p.id === appointment.id);
        updatedAppointment[oldAppIndex] = appointment;
        this.appointments = updatedAppointment;
        this.appointmentUpdated.next([...this.appointments]);
        this.router.navigate(["/appointment"]);
      });
  }
}

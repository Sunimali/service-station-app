/*import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Appointment } from "./appointment.model";
import { Router } from '@angular/router';
import { StaffService } from '../staff/staff.service';
import { Schedule } from './schedule.model';


@Injectable({ providedIn: "root" })
export class VehicleAppointmentService {
  private appointments: Appointment[] = [];
  private schedules:Schedule[];
  //private dates:string[] =[];
  private scheduleUpdated = new Subject<Schedule[]>();
  private appointmentUpdated = new Subject<Appointment[]>();

  constructor(private http: HttpClient ,private router: Router,private staffService:StaffService) {}

  getAppointments() {
    
    this.http
      .get<{ message: string; appointments: any }>(
        "http://localhost:3000/api/appointment"
      )
      .pipe(map((AppointmentData) => {
        return AppointmentData.appointments.map(appointment => {
          console.log(appointment.date+"date is here");
         // this.dates.push(appointment.date);
          return {
            owner: appointment.owner,
            vehicle: appointment.vehicle,
            date: appointment.date,
            time: appointment.time,
            package: appointment.package,
            staffid: appointment.staffid,
            accepted:appointment.accepted,
            id: appointment._id
          };
      
        });
      }))
      .subscribe(transformedApp => {
        this.appointments = transformedApp;
        this.appointmentUpdated.next([...this.appointments]);
        
      });
      
  }

  getDates(){
    this.http
    .get<{ message: string; schedules: any }>(
      "http://localhost:3000/api/schedule"
    )
    .pipe(map((ScheduleData) => {
      return ScheduleData.schedules.map(schedule => {
        return {
          date: schedule.date,
          slots: schedule.slots,
          id: schedule._id
        };
      });
    }))
    .subscribe(transformedSche => {
      this.schedules = transformedSche;
      this.scheduleUpdated.next([...this.schedules]);
    });
  }
  getDatesUpdateListener() {
    return this.scheduleUpdated.asObservable();
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
  acceptAppointment(id: string, owner: string, vehicle: string, date:string,time: string, packg:string,staffid:string,accpted:boolean) {
  
    const appointment: Appointment = { id: id, owner: owner, vehicle: vehicle, date:date,time:time ,package:packg,staffid:staffid,accepted:accpted};
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
}*/

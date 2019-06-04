import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Appointment } from "./appointment.model";
import { Router } from '@angular/router';


@Injectable({ providedIn: "root" })
export class VehicleAppointmentService {
  private appointments: Appointment[] = [];
  private appointmentUpdated = new Subject<Appointment[]>();

  constructor(private http: HttpClient ,private router: Router) {}

  getStaff() {
    this.http
      .get<{ message: string; appointments: any }>(
        "http://localhost:3000/api/appointments"
      )
      .pipe(map((AppointmentData) => {
        return AppointmentData.appointments.map(appointment => {
          return {
            name: appointment.name,
            mobile: appointment.mobile,
            salary: appointment.salary,
            rate: appointment.rate,
            id: appointment._id
          };
        });
      }))
      .subscribe(transformedApp => {
        this.appointments = transformedApp;
        this.appointmentUpdated.next([...this.appointments]);
      });
  }

  getStaffUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }

  addStaff(name: string, mobile: string,salary:string,rate:string,free:boolean) {
    const appointment: Appointment = { id: null, name: name, mobile: mobile, salary:salary,rate:rate };
    console.log(appointment);
    this.http
      .post<{ message: string, appId: string }>("http://localhost:3000/api/appointments", appointment)
      .subscribe(responseData => {
        const id = responseData.appId;
        console.log("id:"+id);
        appointment.id = id;
        this.appointments.push(appointment);
        this.appointmentUpdated.next([...this.appointments]);
      });
  }

  getappointment(appId: string) {
    return this.http.get<{ _id: string; name: string; mobile: string; salary: string;rate: string}>(
      "http://localhost:3000/api/appId/" + appId
    );
  }

  deleteStaff(appId: string) {
    this.http.delete("http://localhost:3000/api/staff/" + appId)
      .subscribe(() => {
        const updatedAppointment = this.appointments.filter(staff => staff.id !== appId);
        this.appointments = updatedAppointment;
        this.appointmentUpdated.next([...this.appointments]);
      });
  }
  updateStaff(id: string, name: string, mobile: string, salary: string,rate: string) {
    const appointment: Appointment = { id: id, name: name, mobile: mobile, salary:salary,rate:rate };
    this.http
      .put("http://localhost:3000/api/appointments/" + id, appointment)
      .subscribe(response => {
        const updatedPosts = [...this.appointments];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === appointment.id);
        updatedPosts[oldPostIndex] = appointment;
        this.appointments = updatedPosts;
        this.appointmentUpdated.next([...this.appointments]);
        this.router.navigate(["/staff"]);
      });
  }
}

  import { Component, OnInit } from '@angular/core';
import { VehicleAppointmentService } from './vehicle-appointment.service';
import { Appointment } from './appointment.model';
import { Subscription, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { StaffService } from '../staff/staff.service';
import { StaffMember } from '../staff/staffMember.model';

@Component({
  selector: 'app-vehicle-appointment',
  templateUrl: './vehicle-appointment.component.html',
  styleUrls: ['./vehicle-appointment.component.scss']
})
export class VehicleAppointmentComponent implements OnInit {

  appointments : Appointment []=[];
  staffMembers:StaffMember[]=[];
  acceptedAppointments:Appointment[] = [];
  pendingApppointments:Appointment[]= [];
  pendingSelectedAppointment:Appointment;
  private postsSub: Subscription;
  isViewClicked: boolean = false;
  itemClicked:number;

  constructor(private vehicleAppointmentService:VehicleAppointmentService,private staffService:StaffService) {}

  ngOnInit() {

    this.staffService.getStaff();
    this.postsSub = this.staffService.getStaffUpdateListener()
      .subscribe((staffMembers: StaffMember[]) => {
        this.staffMembers = staffMembers;
      });

     
    this.vehicleAppointmentService.getAppointments();
    this.postsSub = this.vehicleAppointmentService.getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.ons(this.appointments);
      });
     
  }
  ons(app:Appointment[]){
   
    this.appointments = app;
    this.appointments.forEach(appt => {
      if(appt.accepted){
        this.acceptedAppointments.push(appt);
      }
      else{
        this.pendingApppointments.push(appt);
      }
      
    });

  }
  onViewDetailForAccept(i:number){
    this.pendingSelectedAppointment = this.pendingApppointments[i];
    console.log(this.pendingApppointments[0].owner);

  }

  onAcceptAppointment(form: NgForm){
    console.log("accept appointment");
    if (form.invalid) {
      return;
    }
    this.vehicleAppointmentService.acceptAppointment( this.pendingSelectedAppointment.id, form.value.owner, 
      form.value.vehicle,form.value.date,form.value.time,form.value.package,
      form.value.staffid,true);
    console.log(form.value.staffid);
    form.resetForm();
  }

  onDelete(staffId: string) {
    this.vehicleAppointmentService.declineAppointment(staffId);
  }

  onView(staffId: string) {
    this.vehicleAppointmentService.getappointment(staffId);
  }

  onViewDetail(event:Event){
    this.isViewClicked=true;
    this.itemClicked = Number((<HTMLElement>event.target).id);
  }

  onDoneClicked(){
    this.isViewClicked =false;
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
 

  


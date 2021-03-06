import { Component, OnInit } from "@angular/core";
import { VehicleAppointmentService } from "./vehicle-appointment.service";
import { Appointment } from "./appointment.model";
import { Subscription, from } from "rxjs";
import { NgForm } from "@angular/forms";
import { StaffService } from "../staff/staff.service";
import { StaffMember } from "../staff/staffMember.model";
import { PaymentService } from '../log/payment.service.';
import { Payment } from '../log/payment.model.';

@Component({
  selector: "app-vehicle-appointment",
  templateUrl: "./vehicle-appointment.component.html",
  styleUrls: ["./vehicle-appointment.component.scss"]
})
export class VehicleAppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  staffMembers: StaffMember[] = [];
  availableStaff: StaffMember[] = [];
  acceptedAppointments: Appointment[] = [];
  pendingApppointments: Appointment[] = [];
  pendingSelectedAppointment: Appointment;
  acceptedSelectedAppointment: Appointment;
  selectedStaff:StaffMember;
  private postsSub: Subscription;
  isViewClicked: boolean = false;
  itemClicked: number;
  total:string;
  
  packageCharges:string;
  constructor(
    private vehicleAppointmentService: VehicleAppointmentService,
    private staffService: StaffService,
    private paymentService:PaymentService
  ) {}

  ngOnChanges(){
    console.log("testiing1");
  }

  ngOnInit() {
    console.log("testiing");
    this.staffService.getStaff();
    this.postsSub = this.staffService
      .getStaffUpdateListener()
      .subscribe((staffMembers: StaffMember[]) => {
        this.staffMembers = staffMembers;
      });

    this.vehicleAppointmentService.getAppointments();
    this.postsSub = this.vehicleAppointmentService
      .getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        console.log(appointments);
        this.ons(this.appointments);
      });
  }
  ons(app: Appointment[]) {
    this.appointments = app;
    this.appointments.forEach(appt => {
      if (appt.accepted) {
        this.acceptedAppointments.push(appt);
      } else {
        this.pendingApppointments.push(appt);
      }
    });
  }

  selectPackgeChareges(){
    if(this.acceptedSelectedAppointment.package=="full"){
      this.packageCharges = "4000";
    }
    else{
      this.packageCharges = "2000"
    }
  }

  getstaffmemberByid(){
    console.log(this.staffMembers);
    console.log(this.acceptedSelectedAppointment);
    this.staffMembers.forEach(st=>{
      if(st.id==this.acceptedSelectedAppointment.staffid){
        console.log("matched");
        this.selectedStaff = st;
      }
    });
    console.log(this.selectedStaff);
  }
  staffFilter(){
    this.acceptedAppointments.forEach(app => {
      var id;
      if(app.date==this.pendingSelectedAppointment.date && app.time==this.pendingSelectedAppointment.time){
        console.log("no vacany..");
        id = app.staffid
      }else{
        this.staffMembers.forEach(st => {
           if(st.id!= id ){
             console.log(st.name);
            this.availableStaff.push(st);
           }
        });
        
      }
      
    });
  }
  staffSelected(value){
    this.pendingSelectedAppointment.staffid = value;
  }

  onViewDetailForAccept(i: number) {
    this.pendingSelectedAppointment = this.pendingApppointments[i];
    this.staffFilter();
    console.log("ss"+this.availableStaff);
  
  }

  onViewDetailForAccepted(i: number) {
    this.acceptedSelectedAppointment = this.acceptedAppointments[i];
    this.getstaffmemberByid();
    this.selectPackgeChareges();
  
  }
  onAcceptAppointment(form: NgForm) {
    console.log("accept appointment");
    
    /*if (form.invalid) {
      return;
    }*/
    const app: Appointment = {
      id: this.pendingSelectedAppointment.id,
      owner: this.pendingSelectedAppointment.owner,
      vehicle: this.pendingSelectedAppointment.vehicle,
      date: this.pendingSelectedAppointment.date,
      time: this.pendingSelectedAppointment.time,
      package: this.pendingSelectedAppointment.package,
      staffid: this.pendingSelectedAppointment.staffid,
      accepted: true
    };
  
    this.vehicleAppointmentService.acceptAppointment(
      this.pendingSelectedAppointment.id,
      app.owner,
      app.vehicle,
      app.date,
      app.time,
      app.package,
      app.staffid,
      true
    );
    this.ngOnInit();
    form.resetForm();
  }

  onPayment(form: NgForm){

    const total = +form.value.oil+form.value.packcharges+form.value.additional+form.value.airfiltering
    console.log(total);
    
    this.paymentService.addPayment(form.value.packcharges,
      form.value.oil,
      form.value.airfiltering,form.value.additional,total,this.acceptedSelectedAppointment.id);
  }

  onDelete(staffId: string) {
    this.vehicleAppointmentService.declineAppointment(staffId);
  }

  onView(staffId: string) {
    this.vehicleAppointmentService.getappointment(staffId);
  }

  onDoPayment(form: NgForm){

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

  import { Component, OnInit } from '@angular/core';
import { VehicleAppointmentService } from './vehicle-appointment.service';
import { Appointment } from './appointment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-appointment',
  templateUrl: './vehicle-appointment.component.html',
  styleUrls: ['./vehicle-appointment.component.scss']
})
export class VehicleAppointmentComponent implements OnInit {

  appointments : Appointment [];
  private postsSub: Subscription;
  isViewClicked: boolean = false;
  itemClicked:number;

  constructor(private vehicleAppointmentService:VehicleAppointmentService) {
   // this.vehicleLog = vehicleAppointmentService.getLogItems();
  //  this.vehicleLog = this.vehicleLog.reverse();
  }

  ngOnInit() {
    this.vehicleAppointmentService.getStaff();
    this.postsSub = this.vehicleAppointmentService.getStaffUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
      });
  }
  onDelete(staffId: string) {
    this.vehicleAppointmentService.deleteStaff(staffId);
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
 

  


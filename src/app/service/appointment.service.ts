import { AppointmentDetail } from "../interface/appointmentDetail.interface";

export class AppointmentService{
  appointment : AppointmentDetail[]=[
    {vehicleNumber:"CAD-1452",date:"2019-05-04",time:"12.30pm",timePeriod:"2 hours"},
    {vehicleNumber:"CAD-1452",date:"2019-05-04",time:"12.30pm",timePeriod:"2 hours"}
  ];

  getAppointmentDetails(){
    return this.appointment;
  }
}

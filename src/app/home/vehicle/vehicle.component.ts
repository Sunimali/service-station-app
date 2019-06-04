import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { VehicleService } from "../../service/vehicle.service";

import { VehicleDetail } from "../../interface/vehicleDetail.interface";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {


  vehicleDetail : VehicleDetail[];
  vehicleNumber : string;
  vehicleType:string;
  vehicleEnergy:string;

  constructor(private vehicleService:VehicleService) {
    this.vehicleDetail = vehicleService.getVehicles();
   }

  ngOnInit() {
  }

  onRemoveClick(event:Event,i:number){
    if (confirm("Are you sure want delete vehicle "+(<HTMLElement>event.target).offsetParent.childNodes[0].nodeValue+"?")) {
      //console.log((<HTMLElement>event.target).id);
      let idInNumber:number = Number((<HTMLElement>event.target).id);
      this.vehicleDetail.splice(idInNumber,1);
    }
  }

  onSubmitVehicle(formElement:NgForm){
    let submittedVehicle: VehicleDetail = {
      vehicleNumber : formElement.value.vehicleNumber,
      type: formElement.value.vehicleType,
      isHybrid: formElement.value.vehicleEnergy
    }

    this.vehicleService.addVehicle(submittedVehicle);
    //console.log(formElement.value.vehicleType);
    document.getElementById("exampleModal").click();
  }

}

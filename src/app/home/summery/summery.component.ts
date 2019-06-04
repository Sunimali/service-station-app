import { Component, OnInit } from '@angular/core';

import { VehicleService } from "../../service/vehicle.service";
import { LogService } from "../../service/log.service";

import { LogItem } from "../../interface/logItem.interface";
import {  VehicleDetail } from "../../interface/vehicleDetail.interface";

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss']
})
export class SummeryComponent implements OnInit {

  vehicles : VehicleDetail[];
  logs : LogItem[];
  selectedLogs : LogItem []=[];

  constructor(private vehicleService : VehicleService,private logService : LogService) {
    this.vehicles = vehicleService.getVehicles();
    this.logs = logService.getLogItems();

    this.getReleventLogDetails();
  }

  getReleventLogDetails(){
    for(let i=0; i<this.vehicles.length;++i){
      for(let j=this.logs.length-1;j>=0;--j){
        if(this.vehicles[i].vehicleNumber==this.logs[j].vehicleNumber){
          this.selectedLogs.push(this.logs[j]);
          break;
        }
      }
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

import { LogService } from '../service/log.service';
import { LogItem } from '../interface/logItem.interface';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  vehicleLog : LogItem [];
  isViewClicked: boolean = false;
  itemClicked:number;

  constructor(private logService:LogService) {
    this.vehicleLog = logService.getLogItems();
    this.vehicleLog = this.vehicleLog.reverse();
  }

  ngOnInit() {
  }

  onViewDetail(event:Event){
    this.isViewClicked=true;
    this.itemClicked = Number((<HTMLElement>event.target).id);
  }

  onDoneClicked(){
    this.isViewClicked =false;
  }

}

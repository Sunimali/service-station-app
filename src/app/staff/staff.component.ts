import { Component, NgModule } from '@angular/core';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffListComponent } from './staff-list/staff-list.component';

@Component({
    selector: "app-staff",
    templateUrl: "./staff.component.html",
    styleUrls: ["./staff.component.css"]
  })
  @NgModule({
    declarations: [
      StaffCreateComponent,
    StaffListComponent]})
    
  export class StaffComponent {

  }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummeryComponent } from './home/summery/summery.component';
import { VehicleComponent } from './home/vehicle/vehicle.component';
import { AppointmentComponent } from './home/appointment/appointment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogComponent } from './log/log.component';

import { CustomerService } from "./service/customer.service";
import { LogService } from "./service/log.service";
import { AppointmentService } from "./service/appointment.service";
import { VehicleService } from "./service/vehicle.service";
import { NavBar } from './service/navBar.service';

import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { StaffCreateComponent } from './staff/staff-create/staff-create.component';
import { StaffComponent } from './staff/staff.component';
import { StaffService } from './staff/staff.service';

import { VehicleAppointmentComponent } from './vehicle-appointment/vehicle-appointment.component';
import{VehicleAppointmentService}from './vehicle-appointment/vehicle-appointment.service';
import { PaymentService } from './log/payment.service.';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'log', component: LogComponent},
  {path: 'appointment', component: VehicleAppointmentComponent},
  {path: 'staff', component: StaffComponent},
  {path: '**', component: PageNotFoundComponent}
] ;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummeryComponent,
    VehicleComponent,
    AppointmentComponent,
    LogComponent,
    VehicleAppointmentComponent,
    StaffListComponent,
    StaffComponent,
    StaffCreateComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CustomerService,
    AppointmentService,
    LogService,
    StaffService,
    VehicleService,
    VehicleAppointmentService,
    PaymentService,
    NavBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

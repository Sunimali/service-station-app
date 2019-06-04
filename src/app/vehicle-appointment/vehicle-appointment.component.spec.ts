import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAppointmentComponent } from './vehicle-appointment.component';

describe('VehicleAppointmentComponent', () => {
  let component: VehicleAppointmentComponent;
  let fixture: ComponentFixture<VehicleAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

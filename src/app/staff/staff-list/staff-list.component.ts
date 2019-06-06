import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { StaffMember } from "../staffMember.model";
import { StaffService } from "../staff.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.css"]
})
export class StaffListComponent implements OnInit, OnDestroy {
  
  staffMembers: StaffMember[] = [];
  selectedStaff :StaffMember;
  private postsSub: Subscription;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.staffService.getStaff();
    this.postsSub = this.staffService.getStaffUpdateListener()
      .subscribe((staffMembers: StaffMember[]) => {
        this.staffMembers = staffMembers;
        console.log(this.staffMembers);
      });
      
    this.selectedStaff = this.staffMembers[0]
  }

  onDelete(staffId: string) {
    this.staffService.deleteStaff(staffId);
  }

  onView(i:number) {
    this.selectedStaff = this.staffMembers[i];
    console.log(this.selectedStaff);
    //this.staffService.getStaffMember(staffId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onUpdateStaff(form: NgForm){
    console.log("updating staff");
    if (form.invalid) {
      return;
    }
    this.staffService.updateStaff(this.selectedStaff.id,form.value.staffname, form.value.mobile,form.value.salary,"average",true);
    console.log(form.value.staffname);
    form.resetForm();
  }
}

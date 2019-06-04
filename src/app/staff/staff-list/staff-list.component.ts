import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { StaffMember } from "../staffMember.model";
import { StaffService } from "../staff.service";

@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.css"]
})
export class StaffListComponent implements OnInit, OnDestroy {
  
  staffMembers: StaffMember[] = [];
  private postsSub: Subscription;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.staffService.getStaff();
    this.postsSub = this.staffService.getStaffUpdateListener()
      .subscribe((staffMembers: StaffMember[]) => {
        this.staffMembers = staffMembers;
      });
  }

  onDelete(staffId: string) {
    this.staffService.deleteStaff(staffId);
  }

  onView(staffId: string) {
    this.staffService.getStaffMember(staffId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

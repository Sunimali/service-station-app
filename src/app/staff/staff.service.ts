import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { StaffMember } from "./staffMember.model";
import { Router } from '@angular/router';


@Injectable({ providedIn: "root" })
export class StaffService {
  private staffMembers: StaffMember[] = [];
  private staffUpdated = new Subject<StaffMember[]>();

  constructor(private http: HttpClient ,private router: Router) {}

  getStaff() {
    this.http
      .get<{ message: string; staff: any }>(
        "http://localhost:3000/api/staff"
      )
      .pipe(map((staffData) => {
        console.log(staffData);
        return staffData.staff.map(staffMember => {
          return {
            name: staffMember.name,
            mobile: staffMember.mobile,
            salary: staffMember.salary,
            rate: staffMember.rate,
            id: staffMember._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.staffMembers = transformedPosts;
        this.staffUpdated.next([...this.staffMembers]);
      });
  }

  getStaffUpdateListener() {
    return this.staffUpdated.asObservable();
  }

  addStaff(name: string, mobile: string,salary:string,rate:string,free:boolean) {
    const staffMember: StaffMember = { id: null, name: name, mobile: mobile, salary:salary,rate:rate };
    console.log(staffMember);
    this.http
      .post<{ message: string, staffId: string }>("http://localhost:3000/api/staff", staffMember)
      .subscribe(responseData => {
        const id = responseData.staffId;
        console.log("id:"+id);
        staffMember.id = id;
        this.staffMembers.push(staffMember);
        this.staffUpdated.next([...this.staffMembers]);
      });
  }

  getStaffMember(staffId: string) {
    return this.http.get<{ _id: string; name: string; mobile: string; salary: string;rate: string}>(
      "http://localhost:3000/api/staff/" + staffId
    );
  }

  deleteStaff(staffId: string) {
    this.http.delete("http://localhost:3000/api/staff/" + staffId)
      .subscribe(() => {
        const updatedStaff = this.staffMembers.filter(staff => staff.id !== staffId);
        this.staffMembers = updatedStaff;
        this.staffUpdated.next([...this.staffMembers]);
      });
  }
  updateStaff(id: string, name: string, mobile: string, salary: string,rate: string,free:boolean) {
    const staffMember: StaffMember = { id: id, name: name, mobile: mobile, salary:salary,rate:rate };
    this.http
      .put("http://localhost:3000/api/staff/" + id, staffMember)
      .subscribe(response => {
        const updatedStaff = [...this.staffMembers];
        const oldStaffIndex = updatedStaff.findIndex(p => p.id === staffMember.id);
        updatedStaff[oldStaffIndex] = staffMember;
        this.staffMembers = updatedStaff;
        this.staffUpdated.next([...this.staffMembers]);
        this.router.navigate(["/staff"]);
      });
  }
}

import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { StaffService } from "../staff.service";

@Component({
  selector: "app-staff-create",
  templateUrl: "./staff-create.component.html",
  styleUrls: ["./staff-create.component.css"]
})

export class StaffCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(private staffService: StaffService) {}

  onAddStaff(form: NgForm) {
    console.log("adding staff");
    if (form.invalid) {
      return;
    }
    this.staffService.addStaff(form.value.name, form.value.mobile,form.value.salary,"average",true);
    console.log(form.value.name);
    form.resetForm();
  }
  

}

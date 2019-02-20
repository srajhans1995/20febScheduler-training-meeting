import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Employee } from "src/app/models/employee.model";
import { Room } from "src/app/models/room.model";

import { of } from "rxjs/observable/of";
import { AmazingTimePickerService } from "amazing-time-picker";
import { Observable } from "rxjs/Observable";
import { RoomsService } from "../../shared/rooms.service";
import { NotificationService } from "../../shared/notification.service"
import { EmployeeService } from 'src/app/shared/employee.service';



@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private atp: AmazingTimePickerService,
    private roomservice: RoomsService,
    private notificationservice: NotificationService) {
    console.log(this.employeeService.returnFormEditDetails());
  }
  ngOnInit() {
    this.employeeService.getEmployee();
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(timer => {
      console.log(timer);
    });
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
  }

  onSubmit() {
    if (this.employeeService.form.valid) {
      if (!this.employeeService.form.get('$key').value)

        this.employeeService.updateEmployee(this.employeeService.form.value);
      this.employeeService.insertEmployee(this.employeeService.form.value);
      this.employeeService.form.reset();
      this.employeeService.initializeFormGroup();
      this.notificationservice.success(":: Submitted Successfully");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { RoomsService } from 'src/app/shared/rooms.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-detail-training',
  templateUrl: './detail-training.component.html',
  styleUrls: ['./detail-training.component.scss']
})
export class DetailTrainingComponent implements OnInit {
  detail;
  constructor(private employeeService: EmployeeService,
    private atp: AmazingTimePickerService,
    private roomservice: RoomsService,
    private notificationservice: NotificationService) {
    this.detail = this.employeeService.returnFormEditDetails().value;
    console.log(this.detail);
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

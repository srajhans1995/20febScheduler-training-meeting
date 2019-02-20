import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private firebase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    topic: new FormControl("", Validators.required),
    trainer: new FormControl("", Validators.required),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    date: new FormControl(""),
    starTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    selectRooms: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      topic: "",
      trainer: "",
      description: "",
      date: "",
      starTime: "",
      endTime: "",
      selectRooms: "0"
    });
  }

  getEmployee() {
    this.employeeList = this.firebase.list("employees");
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(employee) {
    this.employeeList.push({
      topic: employee.topic,
      trainer: employee.trainer,
      description: employee.description,
      date: employee.date.toString(),
      starTime: employee.starTime,
      endTime: employee.endTime,
      selectRooms: employee.selectRooms
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      topic: employee.topic,
      trainer: employee.trainer,
      description: employee.description,
      date: employee.date,
      starTime: employee.starTime,
      endTime: employee.endTime,
      selectRooms: employee.selectRooms
    });
  }
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {

    this.form.setValue(_.omit(employee, 'employee.selectRooms'));

  }

  returnFormEditDetails() {
    return this.form;
  }
}

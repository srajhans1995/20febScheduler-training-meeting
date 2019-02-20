import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/shared/employee.service";
import { NewTrainingComponent } from "../new-training/new-training.component";
import { RoomsService } from "../../shared/rooms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "src/app/shared/notification.service";

@Component({
  selector: "app-list-training",
  templateUrl: "./list-training.component.html",
  styleUrls: ["./list-training.component.css"]
})
export class ListTrainingComponent implements OnInit {
  closeResult: string;
  registerForm: FormGroup;
  submitted = false;
  previewPhoto = false;
  searchKey: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private roomService: RoomsService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private activated: ActivatedRoute,
    private router: Router,
    private notificationservice: NotificationService
  ) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = [
    "topic",
    "trainer",
    "description",
    "date",
    "starTime",
    "endTime",
    "selectRooms",
    "actions"
  ];

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(
      list => {
        let array = list.map(item => {
          let selectRooms = this.roomService.getRoomName(item.payload.val()['selectRooms']);
          return {
            $key: item.key,
            selectRooms,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEditTraining(row) {
    this.employeeService.populateForm(row);
    this.router.navigate(['edit-training']);
  }

  onDelete($key) {
    if (confirm('Are You Sure To Delete This Record ?')) {
      this.employeeService.deleteEmployee($key);
      this.notificationservice.warn('! Deleted Successfully');


    }
  }
  onDetailTraining(row) {
    this.employeeService.populateForm(row);
    this.router.navigate(['detail-training']);
  }
}

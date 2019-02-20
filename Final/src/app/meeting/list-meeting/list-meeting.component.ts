import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoomsService } from 'src/app/shared/rooms.service';

import { MatDialog, MatTableDataSource } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { MeetingService } from 'src/app/shared/meeting.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.scss']
})
export class ListMeetingComponent implements OnInit {

  closeResult: string;
  registerForm: FormGroup;
  submitted = false;
  previewPhoto = false;
  searchKey: string;

  constructor(
    private roomService: RoomsService,
    private meetingService: MeetingService,
    private activated: ActivatedRoute,
    private router: Router,
    private notificationservice: NotificationService
  ) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = [
    "meetingName",
    "organizerName",
    "agenda",
    "attendeeList",
    "date",
    "starTime",
    "endTime",
    "selectRooms",
    "actions"
  ];

  ngOnInit() {
    this.meetingService.getMeeting().subscribe(
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
    this.meetingService.populateForm(row);
    this.router.navigate(['edit-training']);
  }

  onDelete($key) {
    if (confirm('Are You Sure To Delete This Record ?')) {
      this.meetingService.deleteMeeting($key);
      this.notificationservice.warn('! Deleted Successfully');


    }
  }


  newMeeting() {
    this.router.navigate(['/meeting/new-meeting']);
  }
}

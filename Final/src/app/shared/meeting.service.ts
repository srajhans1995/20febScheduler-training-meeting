import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from "lodash"

@Injectable({
  providedIn: "root"
})
export class MeetingService {
  constructor(private firebase: AngularFireDatabase) { }
  meetingList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    meetingName: new FormControl("", Validators.required),
    organizerName: new FormControl("", Validators.required),
    agenda: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    attendeeList: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    date: new FormControl("", Validators.required),
    starTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    selectRooms: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      meetingName: "",
      organizerName: "",
      agenda: "",
      attendeeList: "",
      date: "",
      starTime: "",
      endTime: "",
      selectRooms: "0"
    });
  }

  getMeeting() {
    this.meetingList = this.firebase.list("meetings");
    return this.meetingList.snapshotChanges();
  }
  insertMeeting(meeting) {
    this.meetingList.push({
      meetingName: meeting.meetingName,
      organizerName: meeting.organizerName,
      agenda: meeting.agenda,
      attendeeList: meeting.attendeeList,
      date: meeting.date.toString(),
      starTime: meeting.starTime,
      endTime: meeting.endTime,
      selectRooms: meeting.selectRooms
    });
  }

  updateMeeting(meeting) {
    this.meetingList.update(meeting.$key, {
      meetingName: meeting.meetingName,
      organizerName: meeting.organizerName,
      agenda: meeting.agenda,
      attendeeList: meeting.attendeeList,
      date: meeting.date,
      starTime: meeting.starTime,
      endTime: meeting.endTime,
      selectRooms: meeting.selectRooms
    });
  }
  deleteMeeting($key: string) {
    this.meetingList.remove($key);
  }

  populateForm(meeting) {

    this.form.setValue(_.omit(meeting, 'meeting.selectRooms'));
  }

  returnFormEditDetails() {
    return this.form;
  }
}

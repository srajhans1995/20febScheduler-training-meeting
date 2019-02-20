import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class MeetingroomsService {

  meetingRoomList: AngularFireList<any>;
  array =[];

  constructor(private firebase: AngularFireDatabase) {
    this.meetingRoomList = this.firebase.list('meetingrooms');
    this.meetingRoomList.snapshotChanges().subscribe(
      list =>{
        this.array = list.map(item =>{
          return{
            $key: item.key,
            ...item.payload.val()
          };

        });
      });
    
  }
}


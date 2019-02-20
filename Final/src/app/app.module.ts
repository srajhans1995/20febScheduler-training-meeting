import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AmazingTimePickerModule } from "amazing-time-picker";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { TrainingComponent } from "./training/training.component";
import { ListTrainingComponent } from "./training/list-training/list-training.component";
import { environment } from "../environments/environment";
import { MaterialModule } from "../app/material/material.module";
import { MeetingroomsService } from "./shared/meetingrooms.service";
import { NewTrainingComponent } from "./training/new-training/new-training.component";
import { EditTrainingComponent } from './training/edit-training/edit-training.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ListMeetingComponent } from "./meeting/list-meeting/list-meeting.component";
import { NewMeetingComponent } from "./meeting/new-meeting/new-meeting.component";
import { DetailTrainingComponent } from './training/detail-training/detail-training.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrainingComponent,
    ListTrainingComponent,
    EditTrainingComponent,
    MeetingComponent,
    ListMeetingComponent,
    NewMeetingComponent,
    DetailTrainingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MaterialModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MeetingroomsService,],
  bootstrap: [AppComponent],
  // entryComponents: [NewTrainingComponent]
})
export class AppModule { }

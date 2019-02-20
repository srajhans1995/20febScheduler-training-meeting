import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListTrainingComponent } from "./training/list-training/list-training.component";
import { EditTrainingComponent } from "./training/edit-training/edit-training.component";
import { MeetingComponent } from "./meeting/meeting.component";
import { ListMeetingComponent } from "./meeting/list-meeting/list-meeting.component";
import { NewMeetingComponent } from "./meeting/new-meeting/new-meeting.component";
import { DetailTrainingComponent } from "./training/detail-training/detail-training.component";

const routes: Routes = [
  { path: "", component: ListTrainingComponent },

  { path: "list-training", component: ListTrainingComponent },
  { path: "new-training", loadChildren: "./training/new-training/new-training.module#NewTrainingModule" },
  { path: "edit-training", component: EditTrainingComponent },
  { path: "detail-training", component: DetailTrainingComponent },
  {
    path: "meeting", component: MeetingComponent, children: [
      {
        path: 'list-meeting',
        component: ListMeetingComponent
      },
      {
        path: 'new-meeting',
        component: NewMeetingComponent
      },
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

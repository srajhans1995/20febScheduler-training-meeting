import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material";
// import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AmazingTimePickerModule } from "amazing-time-picker";

import { NewTrainingRoutingModule } from "./new-training-routing.module";
import { NewTrainingComponent } from "./new-training.component";

@NgModule({
  declarations: [NewTrainingComponent],
  imports: [
    CommonModule,
    NewTrainingRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    // NgbModal,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    // NgbModule.forRoot(),
    MatIconModule,
    AmazingTimePickerModule
  ],
})
export class NewTrainingModule { }

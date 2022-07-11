import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent {

  constructor(
    private _attendanceService: AttendanceService
  ) { }

  clockIn() {
    this._attendanceService.clockIn()
      .subscribe(data => console.log(data));
  }

}

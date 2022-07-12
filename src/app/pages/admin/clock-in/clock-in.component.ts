import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { find, isEmpty, map } from 'lodash';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';

import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent {

  groupedList: Array<any> = [];

  nextPage: number = 1;

  currentDate: string = moment().local().format('YYYY-MM-DD');

  clockedIn: any = null;

  isLoaded: boolean = false;

  constructor(
    private _attendanceService: AttendanceService,
    private _dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._list();
  }

  clockIn() {
    this._attendanceService.clockIn()
      .subscribe(d => {
        d.clockIn = moment(d.clockIn).local().format('YYYY-MM-DD HH:mm:ss');
        d.clockOut = !isEmpty(d.clockOut) ? moment(d.clockOut).local().format('YYYY-MM-DD HH:mm:ss') : null;
        d.clockedIn = moment(d.clockIn).local().format('YYYY-MM-DD');
        this.groupedList = [
          d,
          ...this.groupedList,
        ];
        this.clockedIn = d;

        if (d.isLate) {
          this._openLateReasonDialog();
        }
      });
  }

  clockOut() {
    this._attendanceService.clockOut(this.clockedIn.id)
      .subscribe(data => {
        this.groupedList = map(this.groupedList, d => {
          if (d.id === data.id) {
            d.clockOut = moment(data.clockOut).local().format('YYYY-MM-DD HH:mm:ss');
          }

          return d;
        });
        this._changeDetectorRef.detectChanges();
      });
  }

  private _openLateReasonDialog() {
    const entity = 'late';
    const action = 'reason';
    const component = `${entity}_${action}`;
    const data = { 
      action, 
      row: this.clockedIn, 
      component,
      entity,
      initKeys: [
        {
          type: 'form',
          variable: 'reasonForm',
          keys: ['id']
        },
      ],
    };
    const _dialogRef = this._dialog.open(DialogComponent, { data });

    _dialogRef.afterClosed()
      .pipe(
        filter(data => !isEmpty(data)),
      )
      .subscribe((result: any) => console.log(result));
  }

  private _list() {
    this.isLoaded = false;
    this._attendanceService.list()
      .pipe(
        filter((data: any) => !isEmpty(data.data))
      )
      .subscribe(
        ({ data, meta: { count } }: any) => {
          if (!isEmpty(data)) {
            this.groupedList = map(data, d => ({
              ...d,
              clockIn: moment(d.clockIn).local().format('YYYY-MM-DD HH:mm:ss'),
              clockOut: !isEmpty(d.clockOut) ? moment(d.clockOut).local().format('YYYY-MM-DD HH:mm:ss') : null,
              clockedIn: moment(d.clockIn).local().format('YYYY-MM-DD'),
              reason: `REASON: ${d.reason}`,
              workingHour: d.workingHour ? d.workingHour : null,
            }));
  
            const _find = find(this.groupedList, ['clockedIn', this.currentDate]);
            if (!isEmpty(_find)) {
              this.clockedIn = _find;
            }
  
            this.nextPage = count + 1;
            this.isLoaded = true;
          }
        },
        err => {
          console.log(err);
          this.isLoaded = true;
        }
      );
  }

}

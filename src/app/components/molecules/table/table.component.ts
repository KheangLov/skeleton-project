import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'lodash';

import { IColumn } from 'src/app/types/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @Input() resultLength = 0;

  @Input() dataList: Array<any> = [];

  @Input() columns: Array<IColumn> = [];

  @Input() pageSizeOptions: Array<number> = [10, 25, 100];

  displayedColumns: Array<string> = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataList);
    this.displayedColumns = map(this.columns, ({ columnDef }) => columnDef);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const _filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = _filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, startWith, map as rxMap, Observable, of } from 'rxjs';
import { isEmpty, lowerCase, map, trim } from 'lodash';

import { IColumn } from 'src/app/types/core';
import { CoreService } from 'src/app/services/core.service';
import { IList } from 'src/app/types/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @Input() resultLength = 0;

  @Input() dataList: Array<any> = [];

  @Input() columns: Array<IColumn> = [];

  @Input() pageSizeOptions: Array<number> = [10, 25, 100];

  displayedColumns: Array<string> = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  isLoadingResults = true;

  constructor(private _coreService: CoreService) {}

  ngOnInit(): void {
    this.displayedColumns = map(this.columns, ({ columnDef }: any) => columnDef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEmpty(changes['dataList']) && !isEmpty(this.dataList)) {
      this.dataSource = new MatTableDataSource(this.dataList);
      this.isLoadingResults = false;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._sortAndPaginate();
  }

  applyFilter(event: Event) {
    const _filterValue = (event.target as HTMLInputElement).value;
    const _param = lowerCase(trim(_filterValue));

    this._setParam(_param);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  private _sortAndPaginate() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        rxMap(this._loadParam.bind(this))
      )
      .subscribe();
    
    this.isLoadingResults = true;
  }

  private _loadParam(): Observable<any> {
    this._setParam('');

    return of(null);
  }

  private _setParam(search: string) {
    const { active: sort, direction: order } = this.sort;
    const { pageIndex, pageSize: perPage } = this.paginator;
    const page = pageIndex + 1;
    const _param: IList = { sort, order, page, perPage, search };

    this._coreService.setListParam(_param);
  }

}

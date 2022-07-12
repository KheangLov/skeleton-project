import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, startWith, map as rxMap, Observable, of } from 'rxjs';
import { isEmpty, lowerCase, map, trim } from 'lodash';

import { IAttribute, IColumn } from 'src/app/types/core';
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

  @Input() actions: Array<any> = [];

  @Input() pageSizeOptions: Array<number> = [10, 25, 100];

  @Input() isLoadingResults = true;

  loadingAttributes: Array<IAttribute> = [
    {
      name: 'class',
      value: 'w-100 position-absolute top-0',
    }
  ];
  
  displayedColumns: Array<string> = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  timeout: any = null;

  constructor(private _coreService: CoreService) {}

  ngOnInit(): void {
    const _columns = map(this.columns, ({ columnDef }: any) => columnDef);

    this.displayedColumns = [..._columns, 'action'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEmpty(changes['dataList']) || !isEmpty(changes['isLoadingResults'])) {
      this.dataSource = new MatTableDataSource(this.dataList);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._sortAndPaginate();
  }

  applyFilter(event: Event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    const _filterValue = (event.target as HTMLInputElement).value;
    const _param = lowerCase(trim(_filterValue));

    this.timeout = setTimeout(() => this._setParam(_param), 1000);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  trackByColumn(index: any) {
    return index;
  }
  
  private _sortAndPaginate() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        rxMap(this._loadParam.bind(this))
      )
      .subscribe();
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

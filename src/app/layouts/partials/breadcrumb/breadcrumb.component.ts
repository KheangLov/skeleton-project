import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from 'src/app/types/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: Array<IBreadcrumb> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

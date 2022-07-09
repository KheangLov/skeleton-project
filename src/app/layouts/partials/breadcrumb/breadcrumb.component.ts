import { Component, Input } from '@angular/core';

import { IBreadcrumb } from 'src/app/types/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() items: Array<IBreadcrumb> = [];

  isLastLength(index: number): boolean {
    const _lastItem = this.items.length - 1;

    return index === _lastItem;
  }

}

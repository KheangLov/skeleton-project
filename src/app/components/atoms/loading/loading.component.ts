import { Component, Input } from '@angular/core';

import { IAttribute } from 'src/app/types/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() color: string = '';

  @Input() isSpinner: boolean = true;

  @Input() isHasOverlay: boolean = true;

  @Input() attributes: Array<IAttribute> = [];

}

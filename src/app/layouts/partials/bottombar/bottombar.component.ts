import { Component, Input } from '@angular/core';

import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent {

  @Input() menuList: Array<IMenu> = [];

}

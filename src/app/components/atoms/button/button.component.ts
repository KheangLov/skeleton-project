import { Component, Input, OnInit } from '@angular/core';

import { HTML_BUTTON_TYPE, IAttribute } from 'src/app/types/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = '';

  @Input() type: HTML_BUTTON_TYPE = 'button';

  @Input() icon: string = '';

  @Input() attributes: Array<IAttribute> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

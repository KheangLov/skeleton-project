import { Component, Input, OnInit } from '@angular/core';

import { IAttribute } from 'src/app/types/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() text: string = '';

  @Input() link: string = '';

  @Input() icon: string = '';

  @Input() attributes: Array<IAttribute> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

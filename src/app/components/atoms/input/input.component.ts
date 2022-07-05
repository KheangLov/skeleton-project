import { Component, Input, OnInit } from '@angular/core';

import { HTML_INPUT_TYPE, IAttribute, MATERIAL_INPUT_APPERANCE } from 'src/app/types/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label: string = '';

  @Input() type: HTML_INPUT_TYPE = 'text';

  @Input() name: string = '';

  @Input() placeholder: string = '';

  @Input() error: string = '';

  @Input() appearance: MATERIAL_INPUT_APPERANCE = 'outline';

  @Input() attributes: Array<IAttribute> = [];
  
  @Input() wrapperAttributes: Array<IAttribute> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

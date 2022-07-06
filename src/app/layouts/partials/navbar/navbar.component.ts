import { Component, Input, OnInit } from '@angular/core';

import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() rightMenuList: Array<IMenu> = [];

  @Input() leftMenuList: Array<IMenu> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

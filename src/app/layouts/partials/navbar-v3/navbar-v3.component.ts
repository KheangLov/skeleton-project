import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-v3',
  templateUrl: './navbar-v3.component.html',
  styleUrls: ['./navbar-v3.component.scss']
})
export class NavbarV3Component {

  @Input() title = 'Clock-IN';

}

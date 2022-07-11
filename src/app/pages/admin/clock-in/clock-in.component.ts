import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent {

  constructor(private _authService: AuthService) { }

  logout() {
    this._authService.doLogout();
  }

}

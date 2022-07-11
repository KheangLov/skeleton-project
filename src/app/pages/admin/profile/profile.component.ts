import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: IUser | null = null;

  constructor(private _authService: AuthService) {
    this.user = this._authService.currentUser;
  }

}

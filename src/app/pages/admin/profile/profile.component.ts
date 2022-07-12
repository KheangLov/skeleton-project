import { Component } from '@angular/core';
import { map, startCase } from 'lodash';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userData: Array<any> = [];

  constructor(private _authService: AuthService) {
    this.userData = this._getUser();
  }

  isUserAdmin(): boolean {
    return this._authService.currentUser.role === 'admin';
  }
  
  private _getUser(): Array<any> {
    const _user: { [key: string]: any } = this._authService.currentUser;
    const _keys = Object.keys(_user);
    const _data = map(_keys, key => ({ 
      key: startCase(key), 
      value: _user[key],
    }));
    
    return _data;
  }

}

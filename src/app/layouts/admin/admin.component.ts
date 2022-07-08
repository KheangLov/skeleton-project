import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends Admin {

  constructor(_authService: AuthService) {
    super(_authService);
  }

}

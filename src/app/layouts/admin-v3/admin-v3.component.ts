import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin-v3',
  templateUrl: './admin-v3.component.html',
  styleUrls: ['./admin-v3.component.scss']
})
export class AdminV3Component extends Admin {

  constructor(_authService: AuthService) {
    super(_authService);
  }

}

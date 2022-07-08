import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin-v2',
  templateUrl: './admin-v2.component.html',
  styleUrls: ['./admin-v2.component.scss']
})
export class AdminV2Component extends Admin {

  constructor(_authService: AuthService) {
    super(_authService);
  }
  
}

import { NgModule } from '@angular/core';
import {
  GoogleApiModule, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
} from 'ng-gapi';

import { environment } from 'src/environments/environment';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.googleClientId,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
};

const modules = [
  GoogleApiModule.forRoot({
    provide: NG_GAPI_CONFIG,
    useValue: gapiClientConfig
  }),
];

@NgModule({
  imports: modules
})
export class GoogleAuthApiModule {}
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as LDClient from 'launchdarkly-js-client-sdk';

const context: LDClient.LDContext = {
  "kind": "multi",
  "user": {
    "key": "user-key",
    "name": "User",
    "email": "user@organization.com"
    },
  "group": {
    "key": "group",
    "name": "Group",
    "address": {
      "street": "1999 Harrison St",
      "city": "Oakland"
      }
    }
};

const client = LDClient.initialize('Client-side ID', context);

client.waitForInitialization().then(() => {
  // initialization succeeded, flag values are now available
  const boolFlagValue = client.variation('angular-test-flag', false) as boolean;
  console.log(`The feature flag variation is: ${boolFlagValue}`);
}).catch((err: Error) => {
  // initialization failed
});

client.on('change', (settings: any) => {
  const boolFlagValue = client.variation('angular-test-flag') as boolean;
  console.log(`The feature flag variation is now: ${boolFlagValue}`);
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-example';
}

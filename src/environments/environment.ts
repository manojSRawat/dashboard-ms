// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  google_analytics_tracking_id: "UA-260554959-3",
  apiURL: 'http://localhost:3008',
  stateCode: "AP",
  numberFormat: {
    reports: {
      locale: 'en-IN',
      format: 'short'
    }
  },
  skipCluster: true,
  config: "state",
  keycloakRealm: "cQube",
  keycloakUrl: "http://localhost:8080/auth",
  keycloakClient: "cQube-app",
  keycloakSecret: "0b39fbf7-0f18-4994-b2a9-4098cddb90b7"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

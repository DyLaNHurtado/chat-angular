// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverSocketLocal: 'http://localhost:5000',
  serverSocketCloud: 'https://chat-api-node-prod-cosmos-chat-bu1tlu.mo1.mogenius.io/',
  APILocalUri: 'http://localhost:8888/api/v1/',
  APICloudUri: 'http://tcp-mo1.mogenius.io:31259/api/v1/',
  APIOption: 'CLOUD',
  wsEndpoint: 'ws://localhost:8081/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const environment = {
  production: true,
  serverSocket: 'http://localhost:5000' || 'http://tcp-mo1.mogenius.io:18799',
  APIUri: 'http://localhost:8888/api/v1/'|| 'http://tcp-mo1.mogenius.io:31259/api/v1/',
  wsEndpoint: 'ws://localhost:8081/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};

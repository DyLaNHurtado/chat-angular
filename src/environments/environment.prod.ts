export const environment = {
  production: true,
  serverSocket: 'http://localhost:5000',
  APIUri: 'http://localhost:8888/api/v1/',
  wsEndpoint: 'ws://localhost:8081/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};

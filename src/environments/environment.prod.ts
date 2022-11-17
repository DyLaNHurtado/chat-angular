export const environment = {
  production: true,
  serverSocketLocal: 'http://localhost:5000',
  serverSocketCloud: 'https://chat-api-node-prod-cosmos-chat-bu1tlu.mo1.mogenius.io/',
  APILocalUri: 'http://localhost:8888/api/v1/',
  APICloudUri: 'https://cosmos-chat-api.onrender.com/api/v1/',
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

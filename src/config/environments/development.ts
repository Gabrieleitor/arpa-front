export const environment = {
  api: {
    baseUrl: 'http://localhost:8080',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  features: {
    debugMode: true,
    analytics: false,
    newFeatures: true
  },
  version: '1.0.0-dev'
};

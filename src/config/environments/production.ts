export const environment = {
  api: {
    baseUrl: 'https://api.arpa.com',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  features: {
    debugMode: false,
    analytics: true,
    newFeatures: false
  },
  version: '1.0.0'
};

import { environment as devEnv } from './environments/development';
import { environment as prodEnv } from './environments/production';

// Función para obtener la configuración según el ambiente
function getEnvironmentConfig() {
  return import.meta.env.MODE === 'development' 
    ? devEnv 
    : prodEnv;
}

// Configuración actual
const currentEnv = getEnvironmentConfig();

export const config = {
  api: {
    baseUrl: currentEnv.api.baseUrl,
    timeout: currentEnv.api.timeout,
    headers: currentEnv.api.headers
  },
  features: currentEnv.features,
  version: currentEnv.version
};

import type { IdentificationType } from '../../domain/entities/IdentificationType';
import { config } from '../../config';

export async function fetchIdentificationTypes(): Promise<IdentificationType[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
    
    try {
      const response = await fetch(`${config.api.baseUrl}/api/identification-types`, {
        headers: config.api.headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Error al obtener los tipos de identificación');
      }
      return response.json();
    } catch (error) {
      if (config.features.debugMode) {
        console.error('Error en fetchIdentificationTypes:', error);
      }
      throw error;
    }
  } catch (error) {
    if (config.features.debugMode) {
      console.error('Error en fetchIdentificationTypes:', error);
    }
    throw error;
  }
}

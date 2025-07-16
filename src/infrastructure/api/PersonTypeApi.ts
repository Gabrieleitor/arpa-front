import {config} from "../../config";
import type {PersonType} from "../../domain/entities/PersonType";

export async function fetchPersonTypes(): Promise<PersonType[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
        try {
            const response = await fetch(`${config.api.baseUrl}/api/person-types`, {
                headers: config.api.headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Error al obtener los tipos de vínculos');
            }
            return response.json();
        } catch (error) {
            if (config.features.debugMode) {
                console.error('Error en fetchPersonTypes:', error);
            }
            throw error;
        }
    } catch (error) {
        if (config.features.debugMode) {
            console.error('Error en fetchPersonTypes:', error);
        }
        throw error;
    }
}
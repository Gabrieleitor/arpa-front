
import {config} from "../../config";
import type {Make} from "../../domain/entities/Make";

export async function fetchMakes(): Promise<Make[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
        try {
            const response = await fetch(`${config.api.baseUrl}/api/makes`, {
                headers: config.api.headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Error al obtener las marcas');
            }
            return response.json();
        } catch (error) {
            if (config.features.debugMode) {
                console.error('Error en fetchMakes:', error);
            }
            throw error;
        }
    } catch (error) {
        if (config.features.debugMode) {
            console.error('Error en fetchMakes:', error);
        }
        throw error;
    }
}
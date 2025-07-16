import type {ArticleType} from "../../domain/entities/ArticleType";
import {config} from "../../config";

export async function fetchArticleTypes(): Promise<ArticleType[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
        try {
            const response = await fetch(`${config.api.baseUrl}/api/article-types`, {
                headers: config.api.headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Error al obtener los tipos de articulos');
            }
            return response.json();
        } catch (error) {
            if (config.features.debugMode) {
                console.error('Error en fetchArticleTypes:', error);
            }
            throw error;
        }
    } catch (error) {
        if (config.features.debugMode) {
            console.error('Error en fetchArticleTypes:', error);
        }
        throw error;
    }
}
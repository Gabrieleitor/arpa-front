import type {ArticleType} from "../../domain/entities/ArticleType";
import type {ArticleTypeService} from "../../application/services/ArticleTypeService";
import {useEffect, useState} from "react";

interface UseArticleTypesResult {
    articleTypes: ArticleType[];
    articleLoading: boolean;
    articleError: string | null;
}

export function useArticleTypes(service: ArticleTypeService): UseArticleTypesResult {
    const [articleTypes, setArticleTypes] = useState<ArticleType[]>([])
    const [articleLoading, setLoading] = useState(true);
    const [articleError, setError] = useState<string | null>(null);
    useEffect(() => {
        setLoading(true);
        service.getArticleTypes()
            .then(setArticleTypes)
            .catch(() => setError("No se pudieron cargar los tipos de artículos "))
            .finally(() => setLoading(false));

    }, [service]);
    return {articleTypes, articleLoading, articleError};
}
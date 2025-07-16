import {useEffect, useState} from "react";
import type {PersonType} from "../../domain/entities/PersonType.ts";
import type {PersonTypeService} from "../../application/services/PersonTypeService.ts";

interface UseArticleTypesResult {
    personTypes: PersonType[];
    personLoading: boolean;
    personError: string | null;
}

export function usePersonTypes(service: PersonTypeService): UseArticleTypesResult {
    const [personTypes, setPersonTypes] = useState<PersonType[]>([])
    const [personLoading, setLoading] = useState(true);
    const [personError, setError] = useState<string | null>(null);
    useEffect(() => {
        setLoading(true);
        service.getArticleTypes()
            .then(setPersonTypes)
            .catch(() => setError("No se pudieron cargar los vínculos de personal "))
            .finally(() => setLoading(false));

    }, [service]);
    return {personTypes, personLoading, personError};
}
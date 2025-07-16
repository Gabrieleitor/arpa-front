
import {useEffect, useState} from "react";
import type {Make} from "../../domain/entities/Make.ts";
import type {MakeService} from "../../application/services/MakeService.ts";

interface UseArticleTypesResult {
    makes: Make[];
    makeLoading: boolean;
    makeError: string | null;
}

export function useMake(service: MakeService): UseArticleTypesResult {
    const [makes, setMakes] = useState<Make[]>([])
    const [makeLoading, setMakeLoading] = useState(true);
    const [makeError, setMakeError] = useState<string | null>(null);
    useEffect(() => {
        setMakeLoading(true);
        service.getArticleTypes()
            .then(setMakes)
            .catch(() => setMakeError("No se pudieron cargar las marcas "))
            .finally(() => setMakeLoading(false));

    }, [service]);
    return { makes,  makeLoading, makeError};
}
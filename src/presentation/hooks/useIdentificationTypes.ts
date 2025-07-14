import { useEffect, useState } from 'react';
import type { IdentificationType } from '../../domain/entities/IdentificationType';
import { IdentificationTypeService } from '../../application/services/IdentificationTypeService';

interface UseIdentificationTypesResult {
  identificationTypes: IdentificationType[];
  loading: boolean;
  error: string | null;
}

export function useIdentificationTypes(service: IdentificationTypeService): UseIdentificationTypesResult {
  const [identificationTypes, setIdentificationTypes] = useState<IdentificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    service.getIdentificationTypes()
      .then(setIdentificationTypes)
      .catch(() => setError('No se pudieron cargar los tipos de identificación'))
      .finally(() => setLoading(false));
  }, [service]);

  return { identificationTypes, loading, error };
}

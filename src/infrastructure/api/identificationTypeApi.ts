import type { IdentificationType } from '../../domain/entities/IdentificationType';

export async function fetchIdentificationTypes(): Promise<IdentificationType[]> {
  const response = await fetch('http://localhost:8080/api/identification-types');
  if (!response.ok) {
    throw new Error('Error al obtener los tipos de identificación');
  }
  return response.json();
}

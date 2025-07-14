import type { IdentificationType } from '../entities/IdentificationType';

interface IdentificationTypeRepository {
  getAll(): Promise<IdentificationType[]>;
}

export type { IdentificationTypeRepository };

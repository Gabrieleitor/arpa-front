import type { IdentificationTypeRepository } from '../../domain/repositories/IdentificationTypeRepository';
import type { IdentificationType } from '../../domain/entities/IdentificationType';
import { fetchIdentificationTypes } from '../api/identificationTypeApi';

export class IdentificationTypeRepositoryImpl implements IdentificationTypeRepository {
  async getAll(): Promise<IdentificationType[]> {
    return fetchIdentificationTypes();
  }
}

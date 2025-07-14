import type { IdentificationType } from '../entities/IdentificationType';
import type { IdentificationTypeRepository } from '../repositories/IdentificationTypeRepository';

export class GetIdentificationTypesUseCase {
  private repository: IdentificationTypeRepository;

  constructor(repository: IdentificationTypeRepository) {
    this.repository = repository;
  }

  async execute(): Promise<IdentificationType[]> {
    return this.repository.getAll();
  }
}

import { GetIdentificationTypesUseCase } from '../../domain/use-cases/GetIdentificationTypesUseCase';
import type { IdentificationType } from '../../domain/entities/IdentificationType';

export class IdentificationTypeService {
  private getIdentificationTypesUseCase: GetIdentificationTypesUseCase;

  constructor(getIdentificationTypesUseCase: GetIdentificationTypesUseCase) {
    this.getIdentificationTypesUseCase = getIdentificationTypesUseCase;
  }

  async getIdentificationTypes(): Promise<IdentificationType[]> {
    // Aquí se podría agregar lógica adicional de negocio si fuera necesario
    return this.getIdentificationTypesUseCase.execute();
  }
}

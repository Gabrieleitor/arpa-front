import {GetIdentificationTypesUseCase} from '../../domain/use-cases/GetIdentificationTypesUseCase';
import type {IdentificationType} from '../../domain/entities/IdentificationType';

export class IdentificationTypeService {
    private getIdentificationTypesUseCase: GetIdentificationTypesUseCase;

    constructor(getIdentificationTypesUseCase: GetIdentificationTypesUseCase) {
        this.getIdentificationTypesUseCase = getIdentificationTypesUseCase;
    }

    async getIdentificationTypes(): Promise<IdentificationType[]> {
        return this.getIdentificationTypesUseCase.execute();
    }
}

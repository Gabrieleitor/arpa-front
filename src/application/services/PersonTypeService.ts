import type {GetPersonTypeUseCase} from "../../domain/use-cases/GetPersontypeUseCase";
import type {PersonType} from "../../domain/entities/PersonType";

export class PersonTypeService {
    private getPersonTypeUseCase: GetPersonTypeUseCase;

    constructor(getPersonTypeUseCase: GetPersonTypeUseCase) {
        this.getPersonTypeUseCase = getPersonTypeUseCase;
    }

    async getArticleTypes(): Promise<PersonType[]> {
        return this.getPersonTypeUseCase.execute();
    }
}
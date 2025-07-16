import type {PersonTypeRepository} from "../repositories/PersonTypeRepository.ts";
import type {PersonType} from "../entities/PersonType.ts";

export class GetPersonTypeUseCase {
    private repository: PersonTypeRepository;

    constructor(repository: PersonTypeRepository) {
        this.repository = repository;
    }

    async execute(): Promise<PersonType[]> {
        return this.repository.getAll();
    }
}
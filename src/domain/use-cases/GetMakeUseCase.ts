import type {MakeRepository} from "../repositories/MakeRepository.ts";
import type {Make} from "../entities/Make.ts";

export class GetMakeUseCase {
    private repository: MakeRepository;

    constructor(repository: MakeRepository) {
        this.repository = repository;
    }

    async execute(): Promise<Make[]> {
        return this.repository.getAll();
    }
}

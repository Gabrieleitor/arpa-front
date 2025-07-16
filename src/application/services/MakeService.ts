import type {GetMakeUseCase} from "../../domain/use-cases/GetMakeUseCase";
import type {Make} from "../../domain/entities/Make";

export class MakeService {
    private getMakeUseCase: GetMakeUseCase;

    constructor(getMakeUseCase: GetMakeUseCase) {
        this.getMakeUseCase = getMakeUseCase;
    }

    async getArticleTypes(): Promise<Make[]> {
        return this.getMakeUseCase.execute();
    }
}
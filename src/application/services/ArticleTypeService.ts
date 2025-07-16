import type {GetArticleTypeUseCase} from "../../domain/use-cases/GetArticleTypeUseCase.ts";
import type {ArticleType} from "../../domain/entities/ArticleType.ts";

export class ArticleTypeService {
    private getArticleTypeUseCase: GetArticleTypeUseCase;

    constructor(getArticleTypeUseCase: GetArticleTypeUseCase) {
        this.getArticleTypeUseCase = getArticleTypeUseCase;
    }

    async getArticleTypes(): Promise<ArticleType[]> {
        return this.getArticleTypeUseCase.execute();
    }
}
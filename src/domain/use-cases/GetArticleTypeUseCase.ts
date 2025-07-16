import type {ArticleTypeRepository} from "../repositories/ArticleTypeRepository";
import type {ArticleType} from "../entities/ArticleType";

export class GetArticleTypeUseCase {
    private repository: ArticleTypeRepository;

    constructor(repository: ArticleTypeRepository) {
        this.repository = repository;
    }

    async execute(): Promise<ArticleType[]> {
        return this.repository.getAll();
    }
}
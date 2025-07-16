import type {ArticleType} from "../entities/ArticleType.ts";

interface ArticleTypeRepository {
    getAll(): Promise<ArticleType[]>;
}

export type {ArticleTypeRepository}
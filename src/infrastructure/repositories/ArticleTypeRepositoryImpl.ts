import type {ArticleTypeRepository} from "../../domain/repositories/ArticleTypeRepository";
import type {ArticleType} from "../../domain/entities/ArticleType";
import {fetchArticleTypes} from "../api/ArticleTypeApi.ts";

export class ArticleTypeRepositoryImpl implements ArticleTypeRepository {
    async getAll(): Promise<ArticleType[]> {
        return fetchArticleTypes();
    }
}
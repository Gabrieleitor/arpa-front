import type {MakeRepository} from "../../domain/repositories/MakeRepository.ts";
import type {Make} from "../../domain/entities/Make.ts";
import {fetchMakes} from "../api/MakeApi.ts";

export class MakeTypeRepositoryImpl implements MakeRepository {
    async getAll(): Promise<Make[]> {
        return fetchMakes();
    }
}
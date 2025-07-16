import type {PersonTypeRepository} from "../../domain/repositories/PersonTypeRepository.ts";
import type {PersonType} from "../../domain/entities/PersonType.ts";
import {fetchPersonTypes} from "../api/PersonTypeApi.ts";

export class PersonTypeRepositoryImpl implements PersonTypeRepository {
    async getAll(): Promise<PersonType[]> {
        return fetchPersonTypes();
    }
}
import type {PersonType} from "../entities/PersonType";

interface PersonTypeRepository {
    getAll(): Promise<PersonType[]>
}

export type {PersonTypeRepository}


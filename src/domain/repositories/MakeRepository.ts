import type {Make} from "../entities/Make";

interface MakeRepository {
    getAll(): Promise<Make[]>;
}

export type {MakeRepository};
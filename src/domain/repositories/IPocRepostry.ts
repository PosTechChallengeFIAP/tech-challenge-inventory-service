import { IPoc } from "@application/DTOs/poc";

export interface IPocRepository {
    save(poc: IPoc): Promise<IPoc>;
    getById(id: number): Promise<IPoc | null>;
    getAll(): Promise<IPoc[]>;
}
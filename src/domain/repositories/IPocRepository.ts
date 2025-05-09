import { IPoc } from "@application/DTOs/poc";
import { IPocToCreate } from "@application/DTOs/poc-to-create";

export interface IPocRepository {
    save(poc: IPocToCreate): Promise<IPoc>;
    getById(id: number): Promise<IPoc | null>;
    getAll(): Promise<IPoc[]>;
}
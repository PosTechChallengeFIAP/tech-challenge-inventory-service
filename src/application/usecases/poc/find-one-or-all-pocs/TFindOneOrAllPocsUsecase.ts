import { IPoc } from "@application/DTOs/poc";

export type TFindOneOrAllPocsUsecaseRequest = {
    id?: number;
}

export type TFindOneOrAllPocsUsecaseResponse = IPoc | IPoc[] | null;
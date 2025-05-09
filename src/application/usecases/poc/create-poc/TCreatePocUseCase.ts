import { IPoc } from "@application/DTOs/poc";
import { EPocCategory } from "@domain/models/EPocCategory";

export type TCreatePocUseCaseRequest = {
    name: string;
    description: string;
    category: EPocCategory;
}

export type TCreatePocUseCaseResponse = IPoc;
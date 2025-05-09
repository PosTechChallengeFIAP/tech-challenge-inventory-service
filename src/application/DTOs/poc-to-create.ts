import { EPocCategory } from "@domain/models/EPocCategory";

export interface IPocToCreate {
    name: string;
    description: string;
    category: EPocCategory;
}
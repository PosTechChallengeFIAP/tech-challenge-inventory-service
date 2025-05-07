import { EPocCategory } from "@domain/models/EPocCategory";

export interface IPoc {
    id: number;
    name: string;
    description: string;
    category: EPocCategory;
    createdAt: Date;
    updatedAt: Date;
}
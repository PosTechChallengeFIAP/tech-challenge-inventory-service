import { IPoc } from "@application/DTOs/poc";
import { EPocCategory } from "./EPocCategory";

export class Poc implements IPoc {
    id: number;
    name: string;
    description: string;
    category: EPocCategory;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, description: string, category: EPocCategory, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
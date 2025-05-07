import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "./EProductCategory";

export class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    category: EProductCategory;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        name: string,
        description: string,
        category: EProductCategory,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
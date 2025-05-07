import { EProductCategory } from "@domain/models/EProductCategory";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    category: EProductCategory;
    createdAt: Date;
    updatedAt: Date;
}
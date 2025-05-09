import { EProductCategory } from "@domain/models/EProductCategory";

export interface IProductToCreate {
    name: string;
    description: string;
    category: EProductCategory;
}
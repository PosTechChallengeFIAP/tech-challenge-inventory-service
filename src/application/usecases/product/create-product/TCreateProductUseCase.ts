import { IProduct } from "@application/DTOs/product"
import { EProductCategory } from "@domain/models/EProductCategory";

export type TCreateProductUseCaseRequest = {
    name: string;
    description: string;
    category: EProductCategory;
}

export type TCreateProductUseCaseResponse = IProduct
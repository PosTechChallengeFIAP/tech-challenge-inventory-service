import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";

export type TFindOneOrAllProductsUseCaseRequest = {
    id?: number;
    category?: EProductCategory;
}

export type TFindOneOrAllProductsUseCaseResponse = IProduct | IProduct[] | null;
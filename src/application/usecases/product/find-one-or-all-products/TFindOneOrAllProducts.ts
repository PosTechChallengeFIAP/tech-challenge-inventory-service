import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";

export type TFindOneOrAllProductsRequest = {
    id?: number;
    category?: EProductCategory;
}

export type TFindOneOrAllProductsResponse = IProduct | IProduct[] | null;
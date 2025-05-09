import { IProduct } from "@application/DTOs/product";
import { IProductToCreate } from "@application/DTOs/product-to-create";
import { EProductCategory } from "@domain/models/EProductCategory";

export interface IProductRepository {
    save(product: IProductToCreate): Promise<IProduct>;
    getById(id: number): Promise<IProduct | null>;
    getAll(): Promise<IProduct[]>;
    getByCategory(category: EProductCategory): Promise<IProduct[]>;
}
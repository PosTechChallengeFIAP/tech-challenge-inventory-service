import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";

export interface IProductRepository {
    save(product: IProduct): Promise<IProduct>;
    getById(id: number): Promise<IProduct | null>;
    getAll(): Promise<IProduct[]>;
    getByCategory(category: EProductCategory): Promise<IProduct[]>;
}
import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "tsyringe";
import { ProductEntity } from "../models/product.entity";
import { typeOrmConnection } from "../typeorm-connection";
import { Repository } from "typeorm";

@injectable()
export class ProductEntityRepository implements IProductRepository {
    private repository: Repository<ProductEntity>;

    constructor() {
        this.repository = typeOrmConnection.getRepository(ProductEntity);
    }

    async getAll(): Promise<IProduct[]> {
        return await this.repository.find();
    }

    async getByCategory(category: EProductCategory): Promise<IProduct[]> {
        return await this.repository.find({ where: { category } });
    }

    async getById(id: number): Promise<IProduct | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async save(product: IProduct): Promise<IProduct> {
        return await this.repository.save(product);
    }
}
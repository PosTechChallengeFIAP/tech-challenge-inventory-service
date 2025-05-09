import { injectable } from "tsyringe";
import { IFindOneOrAllProducts } from "./IFindOneOrAllProducts";
import { TFindOneOrAllProductsRequest, TFindOneOrAllProductsResponse } from "./TFindOneOrAllProducts";
import { IProductRepository } from "@domain/repositories/IProductRepository";

@injectable()
export class FindOneOrAllProducts implements IFindOneOrAllProducts {
    constructor(
        private readonly productRepository: IProductRepository
    ) {}

    async execute(request: TFindOneOrAllProductsRequest): Promise<TFindOneOrAllProductsResponse> {
        const { id, category } = request;

        if (id) {
            return await this.productRepository.getById(id);
        }

        if (category) {
            return await this.productRepository.getByCategory(category);
        }

        return await this.productRepository.getAll();
    }
}
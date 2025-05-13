import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { IFindOneOrAllProductsUseCase } from "./IFindOneOrAllProductsUseCase";
import { TFindOneOrAllProductsUseCaseRequest, TFindOneOrAllProductsUseCaseResponse } from "./TFindOneOrAllProductsUseCase";

@injectable()
export class FindOneOrAllProductsUseCase implements IFindOneOrAllProductsUseCase {
    constructor(
        @inject("ProductRepository")
        private readonly productRepository: IProductRepository
    ) {}

    async execute(request: TFindOneOrAllProductsUseCaseRequest): Promise<TFindOneOrAllProductsUseCaseResponse> {
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
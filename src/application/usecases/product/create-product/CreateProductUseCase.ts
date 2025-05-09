import { inject, injectable } from "tsyringe";
import { TCreateProductUseCaseRequest, TCreateProductUseCaseResponse } from "./TCreateProductUseCase";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { ICreateProductUseCase } from "./ICreateProductUseCase";

@injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
    constructor(
        @inject("ProductRepository")
        private readonly productRepository: IProductRepository,
    ) {}

    async execute(request: TCreateProductUseCaseRequest): Promise<TCreateProductUseCaseResponse> {
        const { name, description, category } = request;

        const product = await this.productRepository.save({
            name,
            description,
            category,
        });

        return product;
    }
}
import { inject, injectable } from "tsyringe";
import { ICreateStockUseCase } from "./ICreateStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { TCreateStockUseCaseRequest, TCreateStockUseCaseResponse } from "./TCreateStockUseCase";

@injectable()
export class CreateStockUseCase implements ICreateStockUseCase {
    constructor(
        @inject("IStockRepository")
        private readonly stockRepository: IStockRepository,
        @inject("IProductRepository")
        private readonly productRepository: IProductRepository,
        @inject("PocRepository")
        private readonly pocRepository: IPocRepository,
    ) {}

    async execute(request: TCreateStockUseCaseRequest): Promise<TCreateStockUseCaseResponse> {
        const { productId, pocId, quantity, unitPrice } = request;

        const product = await this.productRepository.getById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const poc = await this.pocRepository.getById(pocId);
        if (!poc) {
            throw new Error("Poc not found");
        }
        const stock = await this.stockRepository.save({
            product,
            poc,
            quantity,
            unitPrice,
        });

        return stock;
    }
}
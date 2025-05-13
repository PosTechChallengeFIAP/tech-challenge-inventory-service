import { inject, injectable } from "tsyringe";
import { IDecreaseStockUseCase } from "./IDecreaseStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { TDecreaseStockUseCaseRequest, TDecreaseStockUseCaseResponse } from "./TDecreaseStockUseCase";

@injectable()
export class DecreaseStockUseCase implements IDecreaseStockUseCase {
    constructor(
        @inject("StockRepository")
        private readonly stockRepository: IStockRepository,
    ) {}

    async execute(request: TDecreaseStockUseCaseRequest): Promise<TDecreaseStockUseCaseResponse> {
        const { stockId, quantity } = request;

        const stock = await this.stockRepository.getById(stockId);
        if (!stock) {
            throw new Error("Stock not found");
        }

        const success = await this.stockRepository.decreaseQuantity(stockId, quantity);
        if (!success) {
            throw new Error("Failed to decrease stock quantity");
        }

        return {
            success: true,
            message: "Stock quantity decreased successfully",
        };
    }
}
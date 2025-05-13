import { inject, injectable } from "tsyringe";
import { IUpdateStockUseCase } from "./IUpdateStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { TUpdateStockUseCaseRequest, TUpdateStockUseCaseResponse } from "./TUpdateStockUseCase";

@injectable()
export class UpdateStockUseCase implements IUpdateStockUseCase {
    constructor(
        @inject("StockRepository")
        private readonly stockRepository: IStockRepository,
    ) {}

    async execute(request: TUpdateStockUseCaseRequest): Promise<TUpdateStockUseCaseResponse> {
        const { stockId, quantity, unitPrice } = request;

        const stock = await this.stockRepository.getById(stockId);
        if (!stock) {
            throw new Error("Stock not found");
        }

        stock.quantity = quantity || stock.quantity;
        stock.unitPrice = unitPrice || stock.unitPrice;

        await this.stockRepository.update(stock);

        return stock;
    }
}
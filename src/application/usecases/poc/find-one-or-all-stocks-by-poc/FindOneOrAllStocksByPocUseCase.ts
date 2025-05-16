import { IStockRepository } from "@domain/repositories/IStockRepository";
import { inject, injectable } from "tsyringe";
import { IFindOneOrAllStocksByPocUseCase } from "./IFindOneOrAllStocksByPocUseCase";
import { TFindOneOrAllStocksByPocUseCaseRequest, TFindOneOrAllStocksByPocUseCaseResponse } from "./TFindOneOrAllStocksByPocUseCase";

@injectable()
export class FindOneOrAllStocksByPocUseCase implements IFindOneOrAllStocksByPocUseCase {
    constructor(
        @inject("StockRepository")
        private readonly stockRepository: IStockRepository,
    ) {}

    async execute(request: TFindOneOrAllStocksByPocUseCaseRequest): Promise<TFindOneOrAllStocksByPocUseCaseResponse> {
        const { pocId, productId } = request;

        const stocks = productId ? await this.stockRepository.getByPocAndProductId(pocId, productId): await this.stockRepository.getByPocId(pocId);
        return stocks;
    }
}
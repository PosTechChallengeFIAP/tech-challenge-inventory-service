import { IStock } from "@application/DTOs/stock";

export type TFindOneOrAllStocksByPocUseCaseRequest = {
    productId?: number;
    pocId: number;
}

export type TFindOneOrAllStocksByPocUseCaseResponse = IStock | IStock[] | null; 
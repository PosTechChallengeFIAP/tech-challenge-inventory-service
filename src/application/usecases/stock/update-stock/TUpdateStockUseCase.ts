import { IStock } from "@application/DTOs/stock";

export type TUpdateStockUseCaseRequest = {
    stockId: number;
    quantity?: number;
    unitPrice?: number;
}

export type TUpdateStockUseCaseResponse = IStock;
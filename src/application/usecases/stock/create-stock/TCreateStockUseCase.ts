import { IStock } from "@application/DTOs/stock";

export type TCreateStockUseCaseRequest = {
    productId: number;
    pocId: number;
    quantity: number;
    unitPrice: number;
}

export type TCreateStockUseCaseResponse = IStock;
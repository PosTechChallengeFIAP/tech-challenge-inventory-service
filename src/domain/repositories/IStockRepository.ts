import { IStock } from "@application/DTOs/stock";

export interface IStockRepository {
    save(stock: IStock): Promise<IStock>;
    getById(id: number): Promise<IStock | null>;
    getAll(): Promise<IStock[]>;
    getByPocId(pocId: number): Promise<IStock[]>;
    getByPocAndProductId(pocId: number, productId: number): Promise<IStock | null>;
    updateQuantity(stockId: number, quantity: number): Promise<IStock | null>;
}
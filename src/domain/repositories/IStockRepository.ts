import { IStock } from "@application/DTOs/stock";
import { IStockToCreate } from "@application/DTOs/stock-to-create";

export interface IStockRepository {
    save(stock: IStockToCreate): Promise<IStock>;
    update(stock: Partial<IStock>): Promise<IStock>;
    getById(id: number): Promise<IStock | null>;
    getAll(): Promise<IStock[]>;
    getByPocId(pocId: number): Promise<IStock[]>;
    getByPocAndProductId(pocId: number, productId: number): Promise<IStock | null>;
    updateQuantity(stockId: number, quantity: number): Promise<IStock | null>;
    decreaseQuantity(stockId: number, quantity: number): Promise<boolean>;
}
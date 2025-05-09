import { IPoc } from "./poc";
import { IProduct } from "./product";

export interface IStockToCreate {
    poc: IPoc;
    product: IProduct;
    quantity: number;
    unitPrice: number;
}
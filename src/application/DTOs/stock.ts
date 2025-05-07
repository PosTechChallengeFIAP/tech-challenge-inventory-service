import { IPoc } from "./poc";
import { IProduct } from "./product";

export interface IStock {
    id: number;
    poc: IPoc;
    product: IProduct;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
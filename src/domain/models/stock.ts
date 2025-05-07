import { IPoc } from "@application/DTOs/poc";
import { IProduct } from "@application/DTOs/product";
import { IStock } from "@application/DTOs/stock";

export class Stock implements IStock {
    id: number;
    poc: IPoc;
    product: IProduct;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        poc: IPoc,
        product: IProduct,
        quantity: number,
        unitPrice: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }
        
        if (unitPrice < 0) {
            throw new Error("Unit price cannot be negative");
        }

        this.id = id;
        this.poc = poc;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    setQuantity(quantity: number): void {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }
        this.quantity = quantity;
    }

    setUnitPrice(unitPrice: number): void {
        if (unitPrice < 0) {
            throw new Error("Unit price cannot be negative");
        }
        this.unitPrice = unitPrice;
    }

    subtractQuantity(quantity: number): void {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }
        if (this.quantity - quantity < 0) {
            throw new Error("Insufficient stock");
        }
        this.quantity -= quantity;
    }
    
    addQuantity(quantity: number): void {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }
        this.quantity += quantity;
    }
}
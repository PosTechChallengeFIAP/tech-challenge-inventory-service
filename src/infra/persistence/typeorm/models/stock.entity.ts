import { IPoc } from "@application/DTOs/poc";
import { IProduct } from "@application/DTOs/product";
import { IStock } from "@application/DTOs/stock";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { PocEntity } from "./poc.entity";

@Entity({ name: "stocks" })
export class StockEntity implements IStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PocEntity, (poc) => poc.stocks)
    poc: IPoc;
    
    @ManyToOne(() => ProductEntity, (product) => product.stocks)
    product: IProduct;

    @Column()
    quantity: number;

    @Column()
    unitPrice: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
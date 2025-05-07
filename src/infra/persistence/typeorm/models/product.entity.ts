import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StockEntity } from "./stock.entity";

@Entity({ name: "products" })
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: EProductCategory })
    category: EProductCategory;

    @OneToMany(() => StockEntity, (stock) => stock.product)
    stocks: StockEntity[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
import { IPoc } from "@application/DTOs/poc";
import { EPocCategory } from "@domain/models/EPocCategory";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StockEntity } from "./stock.entity";

@Entity({ name: "pocs" })
export class PocEntity implements IPoc {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: EPocCategory })
    category: EPocCategory;

    @OneToMany(() => StockEntity, (stock) => stock.poc)
    stocks: StockEntity[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
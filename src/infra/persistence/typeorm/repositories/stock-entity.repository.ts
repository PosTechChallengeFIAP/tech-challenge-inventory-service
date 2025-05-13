import { IStockRepository } from "@domain/repositories/IStockRepository";
import { Repository } from "typeorm";
import { StockEntity } from "../models/stock.entity";
import { typeOrmConnection } from "../typeorm-connection";
import { IStock } from "@application/DTOs/stock";
import { injectable } from "tsyringe";

@injectable()
export class StockEntityRepository implements IStockRepository {
    private readonly repository: Repository<StockEntity>;

    constructor() {
        this.repository = typeOrmConnection.getRepository(StockEntity);
    }
    
    async getAll(): Promise<IStock[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<IStock | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async getByPocAndProductId(pocId: number, productId: number): Promise<IStock | null> {
        return await this.repository.findOne({ 
            where: { 
                product: {
                    id: productId 
                }, 
                poc: { 
                    id: pocId 
                },
            } 
        });
    }

    async getByPocId(pocId: number): Promise<IStock[]> {
        return await this.repository.find({ where: { poc: { id: pocId } } });
    }

    async save(stock: IStock): Promise<IStock> {
        return await this.repository.save(stock);
    }

    async update(stock: Partial<IStock>): Promise<IStock> {
        return await this.repository.save(stock);
    }

    async updateQuantity(stockId: number, quantity: number): Promise<IStock | null> {
        const stock = await this.getById(stockId);
        if (!stock) return null;
        stock.quantity = quantity;
        return await this.save(stock);
    }

    async decreaseQuantity(stockId: number, quantity: number): Promise<boolean> {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const stock = await queryRunner.manager.findOne(StockEntity, {
                where: { id: stockId },
                lock: { mode: 'pessimistic_write' },
            });

            if (!stock || stock.quantity < quantity) {
                await queryRunner.rollbackTransaction();
                return false;
            }

            stock.quantity -= quantity;
            await queryRunner.manager.save(stock);
            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
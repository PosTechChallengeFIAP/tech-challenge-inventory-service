import { IStockRepository } from "@domain/repositories/IStockRepository";
import { Repository } from "typeorm";
import { StockEntity } from "../models/stock.entity";
import { typeOrmConnection } from "../typeorm-connection";
import { IStock } from "@application/DTOs/stock";
import { injectable } from "tsyringe";

@injectable()
export class StockEntityRepository implements IStockRepository {
    constructor(
      private readonly repository: Repository<StockEntity> = typeOrmConnection.getRepository(StockEntity),
    ) {}
    
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

    async updateQuantity(stockId: number, quantity: number): Promise<IStock | null> {
        return await this.save({ id: stockId, quantity } as IStock);
    }
}
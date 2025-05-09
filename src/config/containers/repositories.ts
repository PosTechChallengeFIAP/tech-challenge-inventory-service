import { IPocRepository } from "@domain/repositories/IPocRepostry";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { PocEntityRepository } from "@infra/persistence/typeorm/repositories/poc-entity.repository";
import { ProductEntityRepository } from "@infra/persistence/typeorm/repositories/product-entity.repository";
import { StockEntityRepository } from "@infra/persistence/typeorm/repositories/stock-entity.repository";
import { container } from "tsyringe";

container.registerSingleton<IPocRepository>('PocRepository', PocEntityRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductEntityRepository);
container.registerSingleton<IStockRepository>('StockRepository', StockEntityRepository);
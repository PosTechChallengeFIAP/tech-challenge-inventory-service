import { CreatePocController } from "@infra/http/controllers/poc/create-poc/CreatePocController";
import { FindOneOrAllPocsController } from "@infra/http/controllers/poc/find-one-or-all-pocs/FindOneOrAllPocsController";
import { CreateProductController } from "@infra/http/controllers/product/create-product/CreateProductController";
import { FindOneOrAllProductsController } from "@infra/http/controllers/product/find-one-or-all-products/FindOneOrAllProductsController";
import { CreateStockController } from "@infra/http/controllers/stock/create-stock/CreateStockController";
import { DecreaseStockController } from "@infra/http/controllers/stock/decrease-stock/DecreaseStockController";
import { UpdateStockController } from "@infra/http/controllers/stock/update-stock/UpdateStockController";
import { IController } from "@infra/http/protocols/controller";
import { container } from "tsyringe";

container.registerSingleton<IController>('CreatePocController', CreatePocController)
container.registerSingleton<IController>('FindOneOrAllPocsController', FindOneOrAllPocsController)
container.registerSingleton<IController>('CreateProductController', CreateProductController)
container.registerSingleton<IController>('FindOneOrAllProductsController', FindOneOrAllProductsController)
container.registerSingleton<IController>('CreateStockController', CreateStockController)
container.registerSingleton<IController>('DecreaseStockController', DecreaseStockController)
container.registerSingleton<IController>('UpdateStockController', UpdateStockController)
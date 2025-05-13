import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const createProductController: IController = container.resolve('CreateProductController')
const findOneOrAllProductsController: IController = container.resolve('FindOneOrAllProductsController') 

export default (route: Router): void => {
    route.get('/products', RouterAdapter.adapt(findOneOrAllProductsController))
    route.post('/products', RouterAdapter.adapt(createProductController))
}
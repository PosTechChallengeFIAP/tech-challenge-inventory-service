import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const createPocController: IController = container.resolve('CreatePocController')
const findOneOrAllPocsController: IController = container.resolve('FindOneOrAllPocsController')
const findOneOrAllStocksByPocController: IController = container.resolve('FindOneOrAllStocksByPocController')

export default (route: Router): void => {
    route.get('/pocs', RouterAdapter.adapt(findOneOrAllPocsController))
    route.post('/pocs', RouterAdapter.adapt(createPocController))
    route.get('/pocs/:pocId/stocks', RouterAdapter.adapt(findOneOrAllStocksByPocController))
}
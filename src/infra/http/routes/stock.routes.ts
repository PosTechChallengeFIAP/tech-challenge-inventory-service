import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const createStockController: IController = container.resolve('CreateStockController')
const updateStockController: IController = container.resolve('UpdateStockController') 
const decreaseStockController: IController = container.resolve('DecreaseStockController')

export default (route: Router): void => {
    route.post('/stocks', RouterAdapter.adapt(createStockController))
    route.patch('/stocks', RouterAdapter.adapt(updateStockController))
    route.put('/stocks/:stockId/decrease', RouterAdapter.adapt(decreaseStockController))
}
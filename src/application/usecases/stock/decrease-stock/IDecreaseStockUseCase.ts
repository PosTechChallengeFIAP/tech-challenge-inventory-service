import { IUseCase } from "@application/usecases/IUseCase";
import { TDecreaseStockUseCaseRequest, TDecreaseStockUseCaseResponse } from "./TDecreaseStockUseCase";

export interface IDecreaseStockUseCase extends IUseCase<TDecreaseStockUseCaseRequest, TDecreaseStockUseCaseResponse> {}
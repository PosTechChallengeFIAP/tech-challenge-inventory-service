import { IUseCase } from "@application/usecases/IUseCase";
import { TUpdateStockUseCaseRequest, TUpdateStockUseCaseResponse } from "./TUpdateStockUseCase";

export interface IUpdateStockUseCase extends IUseCase<TUpdateStockUseCaseRequest, TUpdateStockUseCaseResponse> {}
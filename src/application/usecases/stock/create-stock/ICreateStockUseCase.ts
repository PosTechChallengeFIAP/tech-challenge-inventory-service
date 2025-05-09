import { IUseCase } from "@application/usecases/IUseCase";
import { TCreateStockUseCaseRequest, TCreateStockUseCaseResponse } from "./TCreateStockUseCase";

export interface ICreateStockUseCase extends IUseCase<TCreateStockUseCaseRequest, TCreateStockUseCaseResponse> {}
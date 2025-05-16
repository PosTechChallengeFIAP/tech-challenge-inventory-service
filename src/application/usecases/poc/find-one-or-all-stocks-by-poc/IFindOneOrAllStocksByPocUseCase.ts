import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllStocksByPocUseCaseRequest, TFindOneOrAllStocksByPocUseCaseResponse } from "./TFindOneOrAllStocksByPocUseCase";

export interface IFindOneOrAllStocksByPocUseCase extends IUseCase<TFindOneOrAllStocksByPocUseCaseRequest, TFindOneOrAllStocksByPocUseCaseResponse> {}
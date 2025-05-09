import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllProductsUseCaseRequest, TFindOneOrAllProductsUseCaseResponse } from "./TFindOneOrAllProductsUseCase";

export interface IFindOneOrAllProductsUseCase extends IUseCase<TFindOneOrAllProductsUseCaseRequest, TFindOneOrAllProductsUseCaseResponse> {}
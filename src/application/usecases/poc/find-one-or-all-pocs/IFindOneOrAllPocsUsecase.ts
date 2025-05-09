import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllPocsUsecaseRequest, TFindOneOrAllPocsUsecaseResponse } from "./TFindOneOrAllPocsUsecase";

export interface IFindOneOrAllPocsUsecase extends IUseCase<TFindOneOrAllPocsUsecaseRequest, TFindOneOrAllPocsUsecaseResponse> {}
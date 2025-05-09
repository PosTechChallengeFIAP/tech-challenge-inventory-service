import { IUseCase } from "@application/usecases/IUseCase";
import { TCreatePocUseCaseRequest, TCreatePocUseCaseResponse } from "./TCreatePocUseCase";

export interface ICreatePocUseCase extends IUseCase<TCreatePocUseCaseRequest, TCreatePocUseCaseResponse> {}
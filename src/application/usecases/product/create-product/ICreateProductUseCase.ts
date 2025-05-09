import { IUseCase } from "@application/usecases/IUseCase";
import { TCreateProductUseCaseRequest, TCreateProductUseCaseResponse } from "./TCreateProductUseCase";

export interface ICreateProductUseCase extends IUseCase<TCreateProductUseCaseRequest, TCreateProductUseCaseResponse> {}
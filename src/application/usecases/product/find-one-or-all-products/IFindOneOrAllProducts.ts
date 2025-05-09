import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllProductsRequest, TFindOneOrAllProductsResponse } from "./TFindOneOrAllProducts";

export interface IFindOneOrAllProducts extends IUseCase<TFindOneOrAllProductsRequest, TFindOneOrAllProductsResponse> {}
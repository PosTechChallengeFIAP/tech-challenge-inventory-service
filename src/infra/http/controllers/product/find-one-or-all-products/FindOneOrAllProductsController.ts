import { IFindOneOrAllProductsUseCase } from "@application/usecases/product/find-one-or-all-products/IFindOneOrAllProductsUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindOneOrAllProductsController implements IController {
  constructor(
    @inject("FindOneOrAllProductsUseCase")
    private readonly findOneOrAllProductsUseCase: IFindOneOrAllProductsUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.query;

    const products = await this.findOneOrAllProductsUseCase.execute({ id });
    return HttpResponseHandler.ok(products);
  }
}
import { ICreateStockUseCase } from "@application/usecases/stock/create-stock/ICreateStockUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateStockController implements IController {
  constructor(
    @inject("CreateStockUseCase")
    private readonly createStockUseCase: ICreateStockUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { productId, pocId, quantity, unitPrice } = request.body;

      const stock = await this.createStockUseCase.execute({ productId, pocId, quantity, unitPrice });
      return HttpResponseHandler.ok(stock);
  }
}
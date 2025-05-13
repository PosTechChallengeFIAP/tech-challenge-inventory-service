import { ICreateProductUseCase } from "@application/usecases/product/create-product/ICreateProductUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateProductController implements IController {
  constructor(
    @inject("CreateProductUseCase")
      private readonly createProductUseCase: ICreateProductUseCase
    ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { name, description, category } = request.body;

    const product = await this.createProductUseCase.execute({ name, description, category });
    return HttpResponseHandler.ok(product);
  }
}
import { IDecreaseStockUseCase } from "@application/usecases/stock/decrease-stock/IDecreaseStockUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class DecreaseStockController implements IController {
    constructor(
        @inject("DecreaseStockUseCase")
        private readonly decreaseStockUseCase: IDecreaseStockUseCase

    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { stockId } = request.params;
        const { quantity } = request.body;

        const result = await this.decreaseStockUseCase.execute({
            stockId,
            quantity,
        });
        
        return HttpResponseHandler.ok(result);
    }
}
import { IUpdateStockUseCase } from "@application/usecases/stock/update-stock/IUpdateStockUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateStockController implements IController {
    constructor(
        @inject("UpdateStockUseCase")
        private readonly updateStockUseCase: IUpdateStockUseCase

    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { stockId } = request.params;
        const { quantity, unitPrice } = request.body;

        const result = await this.updateStockUseCase.execute({
            stockId,
            quantity,
            unitPrice
        });
        
        return HttpResponseHandler.ok(result);
    }
}
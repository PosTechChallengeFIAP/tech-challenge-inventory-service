import { IFindOneOrAllStocksByPocUseCase } from "@application/usecases/poc/find-one-or-all-stocks-by-poc/IFindOneOrAllStocksByPocUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindOneOrAllStocksByPocController implements IController {
    constructor(
        @inject("FindOneOrAllStocksByPocUseCase")
        private readonly findOneOrAllStocksByPocUseCase: IFindOneOrAllStocksByPocUseCase,
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { pocId } = request.params;
        const { productId } = request.query;

        const stocks = await this.findOneOrAllStocksByPocUseCase.execute({ pocId, productId });

        return !stocks ? HttpResponseHandler.notFound("Not Found") : HttpResponseHandler.ok(stocks);
    }
}
import { IFindOneOrAllPocsUsecase } from "@application/usecases/poc/find-one-or-all-pocs/IFindOneOrAllPocsUsecase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindOneOrAllPocsController implements IController {
  constructor(
    @inject("FindOneOrAllPocsUsecase")
    private readonly findOneOrAllPocsUseCase: IFindOneOrAllPocsUsecase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.query;

    const pocs = await this.findOneOrAllPocsUseCase.execute({ id });
    return !pocs ? HttpResponseHandler.notFound("Not found") : HttpResponseHandler.ok(pocs);
  }
}
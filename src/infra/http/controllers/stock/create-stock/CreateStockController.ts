import { ICreatePocUseCase } from "@application/usecases/poc/create-poc/ICreatePocUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePocController implements IController {
  constructor(
    @inject("CreatePocUseCase")
    private readonly createPocUseCase: ICreatePocUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { name, description, category } = request.body;

      const poc = await this.createPocUseCase.execute({ name, description, category });
      return HttpResponseHandler.ok(poc);
  }
}
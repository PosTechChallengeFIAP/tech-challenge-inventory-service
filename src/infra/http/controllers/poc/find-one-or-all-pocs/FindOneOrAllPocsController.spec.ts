import { FindOneOrAllPocsController } from "./FindOneOrAllPocsController";
import { IFindOneOrAllPocsUsecase } from "@application/usecases/poc/find-one-or-all-pocs/IFindOneOrAllPocsUsecase";
import { EPocCategory } from "@domain/models/EPocCategory";
import { HttpRequest } from "@infra/http/protocols/http";

describe("FindOneOrAllPocsController", () => {
  let findOneOrAllPocsUseCase: jest.Mocked<IFindOneOrAllPocsUsecase>;
  let controller: FindOneOrAllPocsController;

  beforeEach(() => {
    findOneOrAllPocsUseCase = {
      execute: jest.fn(),
    };
    controller = new FindOneOrAllPocsController(findOneOrAllPocsUseCase);
  });

  it("when ID param is provided should return single POC", async () => {
    const request: HttpRequest = {
      params: { id: "1" },
    };

    const poc = { id: 1, name: "POC A", description: "Desc", category: EPocCategory.BAR } as any;
    findOneOrAllPocsUseCase.execute.mockResolvedValue(poc);

    const response = await controller.handle(request);

    expect(findOneOrAllPocsUseCase.execute).toHaveBeenCalledWith("1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(poc);
  });

  it("when no ID param is provided should return all POCs", async () => {
    const request: HttpRequest = {
      params: {},
    };

    const pocs: any[] = [
      { id: 1, name: "POC A", description: "Desc", category: "OTHER" },
      { id: 2, name: "POC B", description: "Desc", category: "FOOD" },
    ];
    findOneOrAllPocsUseCase.execute.mockResolvedValue(pocs);

    const response = await controller.handle(request);

    expect(findOneOrAllPocsUseCase.execute).toHaveBeenCalledWith(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(pocs);
  });
});

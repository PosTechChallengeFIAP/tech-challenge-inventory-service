import { IFindOneOrAllPocsUsecase } from "@application/usecases/poc/find-one-or-all-pocs/IFindOneOrAllPocsUsecase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { FindOneOrAllPocsController } from "./FindOneOrAllPocsController";

describe("FindOneOrAllPocsController", () => {
  const findOneOrAllPocsUseCase: jest.Mocked<IFindOneOrAllPocsUsecase> = {
    execute: jest.fn()
  };

  const controller = new FindOneOrAllPocsController(findOneOrAllPocsUseCase);

  it("when use case returns null should return 404 response", async () => {
    findOneOrAllPocsUseCase.execute.mockResolvedValue(null);

    const response = await controller.handle({ query: { id: "1" } });

    expect(response).toEqual(HttpResponseHandler.notFound("Not found"));
    expect(findOneOrAllPocsUseCase.execute).toHaveBeenCalledWith({ id: "1" });
  });

  it("when use case returns result should return 200 response with data", async () => {
    const mockPocs: any[] = [{ id: 1, name: "POC 1" }];
    findOneOrAllPocsUseCase.execute.mockResolvedValue(mockPocs);

    const response = await controller.handle({ query: { id: "1" } });

    expect(response).toEqual(HttpResponseHandler.ok(mockPocs));
    expect(findOneOrAllPocsUseCase.execute).toHaveBeenCalledWith({ id: "1" });
  });
});

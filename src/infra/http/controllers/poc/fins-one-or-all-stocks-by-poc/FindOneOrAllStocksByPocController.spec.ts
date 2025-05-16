
import { IFindOneOrAllStocksByPocUseCase } from "@application/usecases/poc/find-one-or-all-stocks-by-poc/IFindOneOrAllStocksByPocUseCase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { FindOneOrAllStocksByPocController } from "./FindOneOrAllStocksByPocController";

describe("FindOneOrAllStocksByPocController", () => {
  const findOneOrAllStocksByPocUseCase: jest.Mocked<IFindOneOrAllStocksByPocUseCase> = {
    execute: jest.fn(),
  };

  const controller = new FindOneOrAllStocksByPocController(findOneOrAllStocksByPocUseCase);

  it("when stocks are found should return ok response", async () => {
    const mockStocks: any[] = [{ id: 1 }];
    findOneOrAllStocksByPocUseCase.execute.mockResolvedValue(mockStocks);

    const request = {
      params: { pocId: 1 },
      query: { productId: 1 },
    };

    const response = await controller.handle(request);

    expect(findOneOrAllStocksByPocUseCase.execute).toHaveBeenCalledWith({
      pocId: 1,
      productId: 1,
    });

    expect(response).toEqual(HttpResponseHandler.ok(mockStocks));
  });

  it("when no stocks are found should return notFound response", async () => {
    findOneOrAllStocksByPocUseCase.execute.mockResolvedValue(undefined as any);

    const request = {
      params: { pocId: 1 },
      query: {},
    };

    const response = await controller.handle(request);

    expect(findOneOrAllStocksByPocUseCase.execute).toHaveBeenCalledWith({
      pocId: 1,
      productId: undefined,
    });

    expect(response).toEqual(HttpResponseHandler.notFound("Not Found"));
  });
});

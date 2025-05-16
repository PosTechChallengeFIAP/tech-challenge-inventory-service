import { IFindOneOrAllProductsUseCase } from "@application/usecases/product/find-one-or-all-products/IFindOneOrAllProductsUseCase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { FindOneOrAllProductsController } from "./FindOneOrAllProductsController";

describe("FindOneOrAllProductsController", () => {
  const findOneOrAllProductsUseCase: jest.Mocked<IFindOneOrAllProductsUseCase> = {
    execute: jest.fn(),
  };

  const controller = new FindOneOrAllProductsController(findOneOrAllProductsUseCase);

  it("when use case returns null should return 404 response", async () => {
    findOneOrAllProductsUseCase.execute.mockResolvedValue(null);

    const response = await controller.handle({ query: { id: "1" } });

    expect(response).toEqual(HttpResponseHandler.notFound("Not found"));
    expect(findOneOrAllProductsUseCase.execute).toHaveBeenCalledWith({ id: "1" });
  });

  it("when use case returns data should return 200 with the data", async () => {
    const mockProducts: any[] = [{ id: 1, name: "Product A" }];
    findOneOrAllProductsUseCase.execute.mockResolvedValue(mockProducts);

    const response = await controller.handle({ query: { id: "1" } });

    expect(response).toEqual(HttpResponseHandler.ok(mockProducts));
    expect(findOneOrAllProductsUseCase.execute).toHaveBeenCalledWith({ id: "1" });
  });
});

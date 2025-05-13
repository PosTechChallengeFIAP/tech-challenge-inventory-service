import { FindOneOrAllProductsController } from "./FindOneOrAllProductsController";
import { IFindOneOrAllProductsUseCase } from "@application/usecases/product/find-one-or-all-products/IFindOneOrAllProductsUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("FindOneOrAllProductsController", () => {
  let findOneOrAllProductsUseCase: jest.Mocked<IFindOneOrAllProductsUseCase>;
  let controller: FindOneOrAllProductsController;

  beforeEach(() => {
    findOneOrAllProductsUseCase = {
      execute: jest.fn(),
    };
    controller = new FindOneOrAllProductsController(findOneOrAllProductsUseCase);
  });

  it("when id is provided should return a single product", async () => {
    const request: HttpRequest = {
      query: { id: "1" },
    };

    const expectedProduct = {
      id: 1,
      name: "Product X",
      description: "Test product",
      category: "FOOD",
    } as any;

    findOneOrAllProductsUseCase.execute.mockResolvedValue(expectedProduct);

    const response = await controller.handle(request);

    expect(findOneOrAllProductsUseCase.execute).toHaveBeenCalledWith("1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedProduct);
  });

  it("when id is not provided should return all products", async () => {
    const request: HttpRequest = {
      query: {},
    };

    const expectedProducts: any[] = [
      { id: 1, name: "Product A", description: "Desc A", category: "FOOD" },
      { id: 2, name: "Product B", description: "Desc B", category: "DRINK" },
    ];

    findOneOrAllProductsUseCase.execute.mockResolvedValue(expectedProducts);

    const response = await controller.handle(request);

    expect(findOneOrAllProductsUseCase.execute).toHaveBeenCalledWith(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedProducts);
  });
});
